import styles from './Pagination.module.css'
import { useState } from 'react'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { Arrow, Ellipsis } from '../../icons'

interface PaginationProps {
  count: number
  siblingCount?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  siblingCount=1,
  value,
  defaultValue=1,
  onChange,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultValue)

  const activePage = value ?? currentPage

  const updateCurrentPage = (newPage: number) => {
    setCurrentPage(newPage)
    onChange?.(newPage)
  }

  const leftBoundary = siblingCount + Math.max(0, 3 + siblingCount - activePage)
  const rightBoundary = siblingCount + Math.max(0, 3 + siblingCount - (count - activePage + 1))

  const pages = [...Array(count)].map((_, index) => {
    const pageNumber = index + 1
    const diff = Math.abs(pageNumber - activePage)

    const outOfBoundsLeft = diff <= leftBoundary
    const outOfBoundsRight = diff <= rightBoundary

    console.log(leftBoundary, rightBoundary)

    return (
      (
        outOfBoundsLeft ||
        outOfBoundsRight ||
        pageNumber === 1 ||
        pageNumber === count ||
        (pageNumber === 2 && activePage - 3 === siblingCount) ||
        (pageNumber === count - 1 && (count - activePage) - 2 === siblingCount)
      )
        ? pageNumber : false
    )
  })

  const renderedPages = pages.map((page, index) => {
    if (!page) return

    return (
      <Button
        key={index}
        surface={activePage === page ? 'fill' : 'hollow'}
        action={() => updateCurrentPage(page)}
        internal={{
          root: {
            style: {
              width: '2rem',
              height: '2rem',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
        }}
      >
        <Typography>
          {page}
        </Typography>
      </Button>
    )
  })

  pages[1] ||
    renderedPages.splice(1, 0, <div className={styles['ellipsis-container']}><Ellipsis /></div>)

  pages[count - 2] ||
    renderedPages.splice(count - 1, 0, <div className={styles['ellipsis-container']}><Ellipsis /></div>)

  return (
    <div className={styles['pagination']}>
      <Button
        surface='hollow'
        disabled={activePage === 1}
        action={() => updateCurrentPage(activePage - 1)}
        internal={{
          root: {
            style: {
              width: '2rem',
              height: '2rem',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
        }}
      >
        <div className={styles['prev']}>
          <Arrow color={activePage === 1 ? 'disabled' : 'dimmed'} />
        </div>
      </Button>

      {renderedPages}
      
      <Button
        surface='hollow'
        disabled={activePage === count}
        action={() => updateCurrentPage(activePage + 1)}
        internal={{
          root: {
            style: {
              width: '2rem',
              height: '2rem',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
        }}
      >
        <div className={styles['next']}>
          <Arrow color={activePage === count ? 'disabled' : 'dimmed'} />
        </div>
      </Button>
    </div>
  )
}

export { Pagination }
export type { PaginationProps }
