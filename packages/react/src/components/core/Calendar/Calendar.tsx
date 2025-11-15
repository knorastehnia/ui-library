import { useEffect, useRef, useState } from 'react'
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
    date?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    week?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    days?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
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

  const daysRef = useRef<HTMLDivElement>(null)
  const navOffsetRef = useRef<number>(null)
  const navDirectionRef = useRef<'prev' | 'next'>(null)
  const keyboardNavRef= useRef<boolean>(false)

  const updateSelectedDates = (newDate: Date[]) => {
    value === undefined && setSelectedDates(newDate)
    onChange?.(newDate)
  }

  useEffect(() => {
    if (!keyboardNavRef.current) return

    if (
      navOffsetRef.current === null ||
      navDirectionRef.current === null
    ) return

    const children = getChildren()!
    const offset =
      navDirectionRef.current === 'next' ?
        navOffsetRef.current :
        currentMonthDays + navOffsetRef.current - 1

    const current = children[offset]

    current !== undefined && current.focus()
    keyboardNavRef.current = false
  }, [displayDate])

  const getChildren = () => {
    if (!daysRef.current?.children) return
    const content = daysRef.current

    return Array.from(content.children).flatMap((child) => {
      const button = child.querySelector('button')
      if (!button || button.disabled) return []

      return button
    })
  }

  const handleKeyboard = (e: React.KeyboardEvent) => {
    const keys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
    ]

    if (!keys.includes(e.key)) return
    e.preventDefault()

    const children = getChildren()!

    const getFocusedIndex = () => {
      for (let i = 0; i < children.length; i++) {
        if (children[i] === document.activeElement) {
          return i
        }
      }
    }

    const index = getFocusedIndex()!
    keyboardNavRef.current = true

    const updateFocus = (count: number) => {
      let current = children[index + count]

      if (count > 0 && current === undefined) {
        navDirectionRef.current = 'next'
        navOffsetRef.current = index + count - currentMonthDays
        updateDisplayMonth(displayMonth + 1)
      } else if (count < 0 && current === undefined) {
        navDirectionRef.current = 'prev'
        navOffsetRef.current = index + count + 1
        updateDisplayMonth(displayMonth - 1)
      } else if (current !== undefined) {
        current.focus()
      }
    }

    const offset = 5 - currentMonthStart
    const offsetIndex = index + 13 - offset

    const modifier = e.getModifierState('Shift') ? 12 : 1

    switch (e.key) {
      case 'ArrowLeft':
        updateFocus(-1)
        break

      case 'ArrowRight':
        updateFocus(1)
        break

      case 'ArrowDown':
        updateFocus(7)
        break

      case 'ArrowUp':
        updateFocus(-7)
        break

      case 'PageDown':
        navDirectionRef.current = 'next'
        const nextMonthDays = new Date(displayYear, displayMonth + modifier + 1, 0).getDate()
        navOffsetRef.current = Math.min(index, nextMonthDays - 1)
        updateDisplayMonth(displayMonth + modifier)
        break

      case 'PageUp':
        navDirectionRef.current = 'next'
        const prevMonthDays = new Date(displayYear, displayMonth - modifier + 1, 0).getDate()
        navOffsetRef.current = Math.min(index, prevMonthDays - 1)
        updateDisplayMonth(displayMonth - modifier)
        break

      case 'Home':
        const weekStartIndex = Math.max(offsetIndex - (offsetIndex % 7) + offset - 13, 0)
        const weekStartItem = children[weekStartIndex]
        weekStartItem !== undefined && weekStartItem.focus()

        break

      case 'End':
        const weekEndIndex = Math.min(offsetIndex - (offsetIndex % 7) + offset - 7, children.length - 1)
        const weekEndItem = children[weekEndIndex]
        weekEndItem !== undefined && weekEndItem.focus()

        break

      default:
        break
    }
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

  const updateDisplayMonth = (newMonth: number) => {
    setDisplayDate(new Date(displayYear, newMonth, displayDay))
  }

  return (
    <div
      className={styles['calendar']}
      {...internal?.root}
    >
      <div
        className={styles['date']}
        {...internal?.date}
      >
        <Typography size='l'>
          {monthName} {displayYear}
        </Typography>

        <div className={styles['chevrons']}>
          <Button
            action={() => updateDisplayMonth(displayMonth - 1)}
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
            action={() => updateDisplayMonth(displayMonth + 1)}
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

      <div
        className={styles['week']}
        {...internal?.week}
      >
        {
          weekDays.map((weekDay, index) => {
            return (
              <div
                key={`weekday-${index}`}
                className={styles['weekday']}>
                <Typography
                  color='dimmed'
                  size='s'
                  weight='300'
                >
                  {weekDay.at(0)}
                </Typography>
              </div>
            )
          })
        }
      </div>

      <div
        ref={daysRef}
        className={styles['days']}
        {...internal?.days}
        onKeyDown={handleKeyboard}
      >
        {
          [...Array(6*7)].map((_, index) => {
            const dayIndex = index - currentMonthStart
            const dateValue = new Date(displayYear, displayMonth, dayIndex)
            const fillSlot = index > currentMonthStart && dayIndex < currentMonthDays + 1

            return (
              <div
                key={`day-${index}`}
                className={fillSlot ? styles['day'] : styles['empty-slot']}
              >
                {fillSlot &&
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

                        tabIndex: dayIndex === 1 ? 0 : -1,
                      }
                    }}
                  >
                    <Typography
                      size='s'
                      weight={isDateSelected(dateValue) ? '400' : '300'}
                    >
                      {dayIndex}
                    </Typography>
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
