import { vi, type Mock } from 'vitest'
import { screen, render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Tabs } from './Tabs'
import { Typography } from '../Typography'

describe('Tabs', () => {
  let user: UserEvent
  let component: RenderResult
  let onChange: Mock

  describe('with navigation=select', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <TabsTest
          navigation='select'
          defaultValue='tab1'
          onChange={onChange}
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should switch tabs on Click and display the respective content', async () => {
      const tab = screen.getByRole('button', { name: 'Tab 3' })

      await user.click(tab)
      expect(onChange).toHaveBeenCalledWith('tab3')

      const tabContent = screen.getByText('Tab 3 Content')
      expect(tabContent).toBeVisible()
    })

    it('should ignore disabled tabs', async () => {
      const tab = screen.getByText('Tab 2')

      await user.click(tab)
      expect(onChange).not.toHaveBeenCalled()

      const tabContent = screen.queryByText('Tab 2 Content')
      expect(tabContent).toBeNull()
    })

    it('should handle keyboard navigation', async () => {
      const tab1 = screen.getByText('Tab 1')

      await user.click(tab1)

      await user.keyboard('[ArrowRight]')
      expect(onChange).toHaveBeenCalledWith('tab3')

      const tab3Content = screen.queryByText('Tab 3 Content')
      expect(tab3Content).toBeVisible()

      await user.keyboard('[End]')
      expect(onChange).toHaveBeenCalledWith('tab4')

      await user.keyboard('[ArrowRight]')
      expect(onChange).toHaveBeenCalledWith('tab1')

      await user.keyboard('[PageUp]')
      const tab1Content = screen.queryByText('Tab 1 Content')
      expect(tab1Content).toBeVisible()

      await user.keyboard('[PageDown]')
      expect(onChange).toHaveBeenCalledWith('tab3')
    })
  })

  describe('with navigation=focus', () => {
    beforeEach(() => {
      onChange = vi.fn()
      user = userEvent.setup()
      component = render(
        <TabsTest
          navigation='focus'
          defaultValue='tab1'
          onChange={onChange}
        />
      )
    })

    it('should have no accessibility violations', async () => {
      expect(await axe(component.container)).toHaveNoViolations()
    })

    it('should switch tabs on Click and display the respective content', async () => {
      const tab = screen.getByRole('button', { name: 'Tab 3' })

      await user.click(tab)
      expect(onChange).toHaveBeenCalledWith('tab3')

      const tabContent = screen.getByText('Tab 3 Content')
      expect(tabContent).toBeVisible()
    })

    it('should ignore disabled tabs', async () => {
      const tab = screen.getByText('Tab 2')

      await user.click(tab)
      expect(onChange).not.toHaveBeenCalled()

      const tabContent = screen.queryByText('Tab 2 Content')
      expect(tabContent).toBeNull()
    })

    it('should handle keyboard navigation', async () => {
      const tab1 = screen.getByText('Tab 1')

      await user.click(tab1)

      await user.keyboard('[ArrowRight]')
      expect(onChange).not.toHaveBeenCalledWith('tab3')
      await user.keyboard('[Space]')
      expect(onChange).toHaveBeenCalledWith('tab3')

      const tab3Content = screen.queryByText('Tab 3 Content')
      expect(tab3Content).toBeVisible()

      await user.keyboard('[End][Enter]')
      expect(onChange).toHaveBeenCalledWith('tab4')

      await user.keyboard('[ArrowRight][Space]')
      expect(onChange).toHaveBeenCalledWith('tab1')

      await user.keyboard('[PageUp][Enter]')
      const tab1Content = screen.queryByText('Tab 1 Content')
      expect(tab1Content).toBeVisible()

      await user.keyboard('[PageDown][Enter]')
      expect(onChange).toHaveBeenCalledWith('tab3')
    })
  })
})

const TabsTest: React.FC<{
  navigation?: 'focus' | 'select'
  defaultValue?: string
  onChange?: (value: string) => void
}> = ({
  navigation,
  defaultValue,
  onChange,
}) => {
  return (
    <Tabs
      navigation={navigation}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <Tabs.Tab label='Tab 1' value='tab1'>
        <Typography>Tab 1 Content</Typography>
      </Tabs.Tab>

      <Tabs.Tab label='Tab 2' value='tab2' disabled>
        <Typography>Tab 2 Content</Typography>
      </Tabs.Tab>

      <Tabs.Tab label='Tab 3' value='tab3'>
        <Typography>Tab 3 Content</Typography>
      </Tabs.Tab>

      <Tabs.Tab label='Tab 4' value='tab4'>
        <Typography>Tab 4 Content</Typography>
      </Tabs.Tab>
    </Tabs>
  )
}
