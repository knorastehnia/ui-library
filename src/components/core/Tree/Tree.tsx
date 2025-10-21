import styles from './Tree.module.css'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '../../icons'
import { Typography } from '../Typography'
import { useCollapseEffect } from '../../../hooks/useCollapseEffect'

interface TreeItemProps {
  children: React.ReactElement | React.ReactElement[]
  action: string | Function
  internal?: {
    root?: React.RefAttributes<HTMLElement>
  }
}

interface TreeBranchProps {
  label: string
  children: React.ReactElement | React.ReactElement[]
  internal?: {
    root?: React.RefAttributes<HTMLDivElement>
    content?: React.RefAttributes<HTMLDivElement>
    trigger?: React.RefAttributes<HTMLButtonElement>
  }
}

interface TreeProps {
  children: React.ReactElement | React.ReactElement[]
  width?: string
  internal?: {
    root?: React.RefAttributes<HTMLDivElement>
  }
}

type TreeComponent = React.FC<TreeProps> & {
  Branch: React.FC<TreeBranchProps>,
  Item: React.FC<TreeItemProps>,
}

const TreeItem: React.FC<TreeItemProps> = ({
  children,
  action,
  internal,
}) => {
  return (
    <>
      {(typeof action === 'string') && action.length > 0
      ?
        <a
          href={action}
          className={styles['item']}
          {...internal?.root as React.HTMLAttributes<HTMLAnchorElement>}
        >
          {children}
        </a>

      :
        <button
          onClick={(e) => typeof action === 'function' && action(e)}
          {...internal?.root as React.HTMLAttributes<HTMLButtonElement>}
        >
          {children}
        </button>
      }
    </>
  )
}

const TreeBranch: React.FC<TreeBranchProps> = ({
  label,
  children,
  internal,
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
    <div {...internal?.root}>
      <button
        className={styles['branch']}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        {...internal?.trigger}
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
        {...internal?.content}
      >
        {children}
      </div>
    </div>
  )
}

const Tree: TreeComponent = ({
  children,
  width='100%',
  internal,
}) => {
  return (
    <>
      <div
        className={styles['tree']}
        style={{ width }}
        {...internal?.root}
      >
        {children}
      </div>
    </>
  )
}

Tree.Branch = TreeBranch
Tree.Item = TreeItem

export { Tree }

export type {
  TreeProps,
  TreeItemProps,
  TreeBranchProps,
}
