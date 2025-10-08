import styles from './Tree.module.css'
import Arrow from '../icons/Arrow'
import Typography from './Typography'
import useCollapseEffect from '../utils/useCollapseEffect'
import { useEffect, useRef, useState } from 'react'

interface TreeItemProps {
  children: React.ReactElement | React.ReactElement[],
  action: string | Function,
}

interface TreeBranchProps {
  label: string,
  children: React.ReactElement | React.ReactElement[],
}

interface TreeProps {
  children: React.ReactElement | React.ReactElement[],
  width?: string,
}

type TreeComponent = React.FC<TreeProps> & {
  Branch: React.FC<TreeBranchProps>,
  Item: React.FC<TreeItemProps>,
}

const TreeItem: React.FC<TreeItemProps> = ({
  children,
  action,
}) => {
  return (
    <>
      {(typeof action === 'string') && action.length > 0
      ?
        <a href={action} className={styles['item']}>
          {children}
        </a>

      :
        <button onClick={(e) => typeof action === 'function' && action(e)}>
          {children}
        </button>
      }
    </>
  )
}

const TreeBranch: React.FC<TreeBranchProps> = ({
  label,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useCollapseEffect(contentRef, isOpen, 300)

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.removeAttribute('inert');
      } else {
        contentRef.current.setAttribute('inert', '');
      }
    }
  }, [isOpen])

  return (
    <>
      <button
        className={styles['branch']}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <Arrow state={isOpen} />
        <Typography color='dimmed'>
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
