import styles from './Tree.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import useCollapseEffect from '../utils/useCollapseEffect'
import { useRef, useState } from 'react'

interface TreeItemProps {
  label: string,
  href: string,
}

interface TreeBranchProps {
  children: React.ReactNode,
  label: string,
}

interface TreeProps {
  children: React.ReactNode,
  width?: string,
}

type TreeComponent = React.FC<TreeProps> & {
  Branch: React.FC<TreeBranchProps>,
  Item: React.FC<TreeItemProps>,
}

const TreeItem: React.FC<TreeItemProps> = ({
  label,
  href,
}) => {
  return (
    <>
      <a href={href} className={styles['item']}>
        <Typography weight='400'>
          {label}
        </Typography>
      </a>
    </>
  )
}

const TreeBranch: React.FC<TreeBranchProps> = ({
  children,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useCollapseEffect(contentRef, isOpen, 300)

  return (
    <>
      <button
        className={styles['branch']}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <Arrow width='0.6rem' height='0.6rem' state={isOpen} />
        <Typography weight='400' color='dimmed'>
          {label}
        </Typography>
      </button>

      <div
        ref={contentRef}
        className={`
          ${styles['content']} 
          ${isOpen && styles['open']}
        `}
      >
        {children}
      </div>
    </>
  )
}

const Tree: TreeComponent = ({
  children,
  width='100%',
}) => {
  return (
    <>
      <div
        className={styles['tree']}
        style={{ width }}
      >
        {children}
      </div>
    </>
  )
}

Tree.Branch = TreeBranch
Tree.Item = TreeItem

export default Tree
