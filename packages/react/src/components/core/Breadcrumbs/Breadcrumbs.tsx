import styles from './Breadcrumbs.module.css'
import { Fragment } from 'react/jsx-runtime'
import { Button, type ButtonProps } from '../Button'
import { Typography, type TypographyProps } from '../Typography'
import { Arrow } from '../../icons'

interface BreadcrumbItem {
  label: string,
  action?: string | ((e: React.MouseEvent) => void),
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  internal?: {
    root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    button?: ButtonProps
    typography?: TypographyProps
  }
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  internal,
}) => {
  return (
    <div
      className={styles['breadcrumbs']}
      {...internal?.root}
    >
      {
        items.map((item, index) => {
          return (
            <Fragment key={index}>
              {item.action !== undefined ?
                <Button
                  surface='text'
                  action={item.action}
                  {...internal?.button}
                >
                  <Typography {...internal?.typography}>
                    {item.label}
                  </Typography>
                </Button>
                
                :
                <Typography
                  color='dimmed'
                  {...internal?.typography}
                >
                  {item.label}
                </Typography>
              }

              {index + 1 < items.length &&
                <div className={styles['seperator']}>
                  <Arrow />
                </div>
              }
            </Fragment>
          )
        })
      }
    </div>
  )
}

export { Breadcrumbs }
export type { BreadcrumbsProps }
