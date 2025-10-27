import styles from './Breadcrumbs.module.css'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { Arrow } from '../../icons'

interface BreadcrumbItem {
  label: string,
  href: string,
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
            <>
              {index + 1 < items.length ?
                <Button surface='text' action={item.href}>
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
            </>
          )
        })
      }
    </div>
  )
}

export { Breadcrumbs }
export type { BreadcrumbsProps }
