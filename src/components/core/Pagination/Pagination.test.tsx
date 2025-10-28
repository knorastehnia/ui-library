import { vi, type Mock } from 'vitest'
import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Pagination, type PaginationProps } from './Pagination'

describe('Pagination', () => {
  let user: UserEvent
  let component: RenderResult
  let onChange: Mock

  const pageCount = 10
  const siblingCount = 1

  beforeEach(() => {
    onChange = vi.fn()
    user = userEvent.setup()
    component = render(
      <PaginationTest
        count={pageCount}
        siblingCount={siblingCount}
        onChange={onChange}
      />
    )
  })

  it('should have no accessibility violations', async () => {
    expect(await axe(component.container)).toHaveNoViolations()
  })

  it('should switch to the selected page on Click', async () => {
    const page = component.getByRole('button', { name: '5' })

    await user.click(page)
    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('should switch to the selected page on Enter/Space', async () => {
    const page = component.getByRole('button', { name: '3' })

    page.focus()
    expect(page).toHaveFocus()

    await user.keyboard('[Enter]')
    await user.keyboard('[Space]')

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('should go to the previous/next page on Click', async () => {
    const nextPageButton = component.getByRole('button', { name: 'Next page' })
    const prevPageButton = component.getByRole('button', { name: 'Previous page' })

    await user.click(nextPageButton)
    await user.click(prevPageButton)

    expect(onChange).toHaveBeenCalledWith(1)
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('should go to the previous/next page on Enter/Space', async () => {
    const nextPageButton = component.getByRole('button', { name: 'Next page' })
    const prevPageButton = component.getByRole('button', { name: 'Previous page' })

    nextPageButton.focus()
    expect(nextPageButton).toHaveFocus()

    await user.keyboard('[Enter]')
    await user.keyboard('[Space]')

    prevPageButton.focus()
    expect(prevPageButton).toHaveFocus()

    await user.keyboard('[Enter]')
    await user.keyboard('[Space]')

    expect(onChange).toHaveBeenCalledTimes(4)
    expect(onChange).toHaveBeenCalledWith(1)
    expect(onChange).toHaveBeenCalledWith(2)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('should not go out of bounds on Click', async () => {
    const end = component.getByRole('button', { name: String(pageCount) })

    const nextPageButton = component.getByRole('button', { name: 'Next page' })
    const prevPageButton = component.getByRole('button', { name: 'Previous page' })

    await user.click(prevPageButton)
    expect(onChange).not.toHaveBeenCalled()

    await user.click(end)
    await user.click(nextPageButton)
    expect(onChange).not.toHaveBeenCalledTimes(2)
  })

  it('should not go out of bounds on Enter/Space', async () => {
    const end = component.getByRole('button', { name: String(pageCount) })

    const nextPageButton = component.getByRole('button', { name: 'Next page' })
    const prevPageButton = component.getByRole('button', { name: 'Previous page' })

    prevPageButton.focus()
    expect(nextPageButton).not.toHaveFocus()
    await user.keyboard('[Enter]')
    await user.keyboard('[Space]')
    expect(onChange).not.toHaveBeenCalled()

    await user.click(end)
    nextPageButton.focus()
    expect(nextPageButton).not.toHaveFocus()
    await user.keyboard('[Enter]')
    await user.keyboard('[Space]')
    expect(onChange).toHaveBeenCalledWith(pageCount)
  })

  it('should navigate with correct Tab order', async () => {
    const page1 = component.getByRole('button', { name: '1' })
    const page2 = component.getByRole('button', { name: '2' })

    page1.focus()
    expect(page1).toHaveFocus()

    await user.tab()
    expect(page2).toHaveFocus()
  })
})

const PaginationTest: React.FC<PaginationProps> = ({
  count,
  value,
  defaultValue=1,
  onChange,
  siblingCount=1,
}) => {
  return (
    <Pagination
      count={count}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      siblingCount={siblingCount}
    />
  )
}
