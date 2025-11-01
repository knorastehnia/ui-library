import { useState } from 'react'
import { Arrow } from '../../icons'
import { Button } from '../Button'
import { Typography } from '../Typography'
import styles from './Calendar.module.css'

interface CalendarProps {
  type?: 'single' | 'multiple' | 'range'
  minValue?: Date
  maxValue?: Date
  value?: Date
  defaultValue?: Date
  onChange?: (value: Date) => void
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  }
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const Calendar: React.FC<CalendarProps> = ({
  minValue,
  maxValue,
  value,
  defaultValue: defaultDate=new Date(),
  onChange,
  internal,
}) => {
  const [selectedDate, setSelectedDate] = useState(defaultDate)
  const activeDate = value ?? selectedDate
  const [displayDate, setDisplayDate] = useState(activeDate)

  const updateSelectedDate = (newDate: Date) => {
    value === undefined && setSelectedDate(newDate)
    onChange?.(newDate)
  }

  const currentYear = activeDate.getFullYear()
  const displayYear = displayDate.getFullYear()
  
  const currentMonth = activeDate.getMonth()
  const displayMonth = displayDate.getMonth()
  const monthName = months[displayMonth]
  
  const currentDay = activeDate.getDate()
  const displayDay = displayDate.getDate()

  const activeDisplay =
    currentYear === displayYear &&
    currentMonth === displayMonth

  const now = new Date()

  const currentMonthStart = new Date(displayYear, displayMonth, 1).getDay() - 1
  const currentMonthDays = new Date(displayYear, displayMonth + 1, 0).getDate()

  return (
    <div
      className={styles['calendar']}
      {...internal?.root}
    >
      <div className={styles['date']}>
        <Typography size='l'>
          {monthName} {displayYear}
        </Typography>

        <div className={styles['chevrons']}>
          <Button
            action={() => setDisplayDate(new Date(displayYear, displayMonth - 1, displayDay))}
            surface='hollow'
            internal={{
              root: {
                style: {
                  width: '2rem',
                  height: '2rem',
                  padding: '0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },

                'aria-label': 'Previous month'
              }
            }}
          >
            <div className={styles['prev-month']}><Arrow /></div>
          </Button>

          <Button
            action={() => setDisplayDate(new Date(displayYear, displayMonth + 1, displayDay))}
            surface='hollow'
            internal={{
              root: {
                style: {
                  width: '2rem',
                  height: '2rem',
                  padding: '0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },

                'aria-label': 'Next month'
              }
            }}
          >
            <div className={styles['next-month']}><Arrow /></div>
          </Button>
        </div>
      </div>

      <div className={styles['week']}>
        {
          weekDays.map((weekDay) => {
            return (
              <div className={styles['weekday']}>
                <Typography color='dimmed' size='s' weight='300'>{weekDay.at(0)}</Typography>
              </div>
            )
          })
        }
      </div>

      <div className={styles['days']}>
        {
          [...Array(6*7)].map((_, index) => {
            const dayIndex = index - currentMonthStart
            const thisDate = new Date(displayYear, displayMonth, dayIndex)

            return (
              <div className={styles['day']}>
                {index > currentMonthStart && dayIndex < currentMonthDays + 1 &&
                  <Button
                    action={() => updateSelectedDate(new Date(displayYear, displayMonth, dayIndex))}
                    surface={
                      currentDay === dayIndex && activeDisplay ? 'fill' :

                      displayDay === dayIndex && now.getFullYear() === displayYear &&
                        now.getMonth() === displayMonth ? 'outline' :

                      'hollow'
                    }
                    disabled={
                      (minValue && thisDate < minValue) ||
                      (maxValue && thisDate > maxValue)
                    }
                    internal={{
                      root: {
                        style: {
                          width: '2rem',
                          height: '2rem',
                          padding: '0',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      }
                    }}
                  >
                    <Typography size='s' weight='300'>{dayIndex}</Typography>
                  </Button>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export { Calendar }
export type { CalendarProps }
