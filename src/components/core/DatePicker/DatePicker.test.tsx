import { vi, type Mock } from 'vitest'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  let user: UserEvent
  let component: RenderResult
  let onChange: Mock

  beforeEach(() => {
    onChange = vi.fn()
    user = userEvent.setup()
    component = render(
      <DatePickerTest
        onChange={onChange}
        defaultValue={[new Date(2025, 0, 15)]}
      />
    )
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(component.container)).toHaveNoViolations()
  })

  it('should select a date on Click', async () => {
    const trigger = component.getByRole('combobox', { name: 'Date Picker' })
    await user.click(trigger)

    const date2 = component.getByRole('button', { name: '2' })
    const date3 = component.getByRole('button', { name: '3' })

    await user.click(date2)
    expect(onChange).toHaveBeenCalledWith([new Date(2025, 0, 2)])

    await user.click(date3)
    expect(onChange).toHaveBeenCalledWith([new Date(2025, 0, 3)])
  })

  it('should cycle through months using the chevron buttons', async () => {
    const trigger = component.getByRole('combobox', { name: 'Date Picker' })
    await user.click(trigger)

    const prev = component.getByRole('button', { name: 'Previous month' })
    const next = component.getByRole('button', { name: 'Next month' })

    await user.click(prev)
    const date = component.getByRole('button', { name: '20' })
    await user.click(date)
    expect(onChange).toHaveBeenCalledWith([new Date(2024, 11, 20)])

    await user.click(next)
    await user.keyboard('[Tab][ArrowRight][Enter]')
    expect(onChange).toHaveBeenCalledWith([new Date(2025, 0, 2)])
  })

  it('should navigate and cycle through years, months, and weeks using Page and Arrow keys', async () => {
    const trigger = component.getByRole('combobox', { name: 'Date Picker' })
    await user.click(trigger)

    const date = component.getByRole('button', { name: '1' })
    date.focus()

    await user.keyboard('[ArrowRight][Enter]')
    expect(onChange).toHaveBeenCalledWith([new Date(2025, 0, 2)])

    await user.keyboard('[PageDown][Enter]')
    expect(onChange).toHaveBeenCalledWith([new Date(2025, 1, 2)])

    await user.keyboard('[ShiftLeft>][PageDown][Enter]')
    expect(onChange).toHaveBeenCalledWith([new Date(2026, 1, 2)])

    await user.keyboard('[ArrowDown][Enter]')
    expect(onChange).toHaveBeenCalledWith([new Date(2026, 1, 9)])
  })
})

const DatePickerTest: React.FC<{
  onChange: (value: Date[]) => void
  value?: Date[]
  defaultValue?: Date[]
}> = ({
  onChange,
  value,
  defaultValue,
}) => {
  return (
    <DatePicker
      label='Date Picker'
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    />
  )
}
