import { vi, type Mock } from 'vitest'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Slider } from './Slider'
import { Typography } from '../Typography'

describe('Slider', () => {
  let user: UserEvent
  let component: RenderResult
  let onChange: Mock

  const step = 5
  const min = 0
  const max = 100

  describe('with disabled=true', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <SliderTest
          minValue={min}
          maxValue={max}
          value={0}
          onChange={onChange}
          disabled
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should not respond to pointer or keyboard navigation', async () => {
      const slider = component.getByRole('slider')

      await user.click(slider)
      expect(onChange).not.toHaveBeenCalled()

      slider.focus()
      await user.keyboard('[ArrowRight]')
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('with disabled=false', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <SliderTest
          minValue={min}
          maxValue={max}
          value={0}
          onChange={onChange}
          step={step}
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should update its value on Click', async () => {
      const slider = component.getByRole('slider')

      await user.click(slider)
      expect(onChange).toHaveBeenCalled()
    })

    it('should update its value upon keyboard navigation', async () => {
      const slider = component.getByRole('slider')

      slider.focus()

      await user.keyboard('[ArrowRight]')
      expect(onChange).toHaveBeenCalledWith(step)

      await user.keyboard('[PageUp]')
      expect(onChange).toHaveBeenCalledWith(step*11)

      await user.keyboard('[Home]')
      expect(onChange).toHaveBeenCalledWith(min)

      await user.keyboard('[End]')
      expect(onChange).toHaveBeenCalledWith(max)

      await user.keyboard('[ShiftLeft>][ArrowLeft]')
      expect(onChange).toHaveBeenCalledWith(max - step*10)

      await user.keyboard('[ShiftLeft>][PageUp]')
      expect(onChange).toHaveBeenCalledWith(max)
    })
  })
})

const SliderTest: React.FC<{
  minValue: number
  maxValue: number
  step?: number
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
}> = ({
  minValue,
  maxValue,
  step,
  value,
  onChange,
  disabled,
}) => {
  return (
    <Slider
      name='s'
      disabled={disabled}
      step={step}
      value={value}
      onChange={onChange}
      minValue={minValue}
      maxValue={maxValue}
    >
      <Typography>Slider</Typography>
    </Slider>
  )
}
