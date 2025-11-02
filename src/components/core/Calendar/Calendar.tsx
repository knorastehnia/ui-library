import { useState } from 'react'
import { Arrow } from '../../icons'
import { Button } from '../Button'
import { Typography } from '../Typography'
import styles from './Calendar.module.css'

interface CalendarProps {
  type?: 'single' | 'multiple'
  minValue?: Date
  maxValue?: Date
  value?: Date[]
  defaultValue?: Date[]
  onChange?: (value: Date[]) => void
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
  type='single',
  minValue,
  maxValue,
  value,
  defaultValue: defaultDate=[new Date()],
  onChange,
  internal,
}) => {
  const [selectedDates, setSelectedDates] = useState(defaultDate)
  const activeDates = value ?? selectedDates
  const [displayDate, setDisplayDate] = useState(activeDates[0])

  const updateSelectedDates = (newDate: Date[]) => {
    value === undefined && setSelectedDates(newDate)
    onChange?.(newDate)
  }

  const displayYear = displayDate.getFullYear()
  
  const displayMonth = displayDate.getMonth()
  const monthName = months[displayMonth]
  
  const displayDay = displayDate.getDate()

  const now = new Date()

  const currentMonthStart = new Date(displayYear, displayMonth, 1).getDay() - 1
  const currentMonthDays = new Date(displayYear, displayMonth + 1, 0).getDate()

  const isDateSelected = (dateValue: Date) => {
    return activeDates.find((date) => {
      return (
        date.getDate() === dateValue.getDate() &&
        date.getMonth() === dateValue.getMonth() &&
        date.getFullYear() === dateValue.getFullYear()
      )
    })
  }

  const toggleSelectedDay = (dateValue: Date) => {
    const dateIndex = isDateSelected(dateValue)

    if (dateIndex === undefined) {
      if (type === 'multiple') {
        updateSelectedDates([...activeDates, dateValue])
      } else if (type === 'single') {
        updateSelectedDates([dateValue])
      }
    } else {
      const updatedDates = activeDates.flatMap((date) => {
        if (
          date.getDate() === dateValue.getDate() &&
          date.getMonth() === dateValue.getMonth() &&
          date.getFullYear() === dateValue.getFullYear()
        ) {
          return []
        } else return date
      })

      updateSelectedDates(updatedDates)
    }
  }

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
          weekDays.map((weekDay, index) => {
            return (
              <div
                key={`weekday-${index}`}
                className={styles['weekday']}>
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
            const dateValue = new Date(displayYear, displayMonth, dayIndex)

            return (
              <div
                key={`day-${index}`}
                className={styles['day']}
              >
                {index > currentMonthStart && dayIndex < currentMonthDays + 1 &&
                  <Button
                    action={() => toggleSelectedDay(dateValue)}
                    surface={
                      isDateSelected(dateValue) ? 'fill' :

                      displayDay === dayIndex && now.getFullYear() === displayYear &&
                        now.getMonth() === displayMonth ? 'outline' :

                      'hollow'
                    }
                    disabled={
                      (minValue && dateValue < minValue) ||
                      (maxValue && dateValue > maxValue)
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
