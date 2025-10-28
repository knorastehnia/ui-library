import styles from './Breadcrumbs.module.css'
import { Fragment } from 'react/jsx-runtime'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { Arrow } from '../../icons'

interface BreadcrumbItem {
  label: string,
  action?: string | Function,
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
}) => {
  return (
    <div className={styles['breadcrumbs']}>
      {
        items.map((item, index) => {
          return (
            <Fragment key={index}>
              {item.action !== undefined ?
                <Button surface='text' action={item.action}>
                  <Typography>
                    {item.label}
                  </Typography>
                </Button>
                
                :
                <Typography color='dimmed'>
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
