import styles from './Tree.module.css'
import Arrow from '../icons/Arrow'
import { useEffect, useRef, useState } from 'react'

interface TreeItemProps {
  children: React.ReactNode,
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
  children,
  href,
}) => {
  return (
    <>
      <a href={href} className={styles['item']}>
        {children}
      </a>
    </>
  )
}

const TreeBranch: React.FC<TreeBranchProps> = ({
  children,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)

  const updateHeight = () => {
    const content = contentRef.current as unknown as HTMLDivElement

    if (isOpen) {
      content.style.height = `${content.scrollHeight}px`
    } else {
      content.style.height = `${content.scrollHeight}px`
      void content.offsetHeight // force reflow
      content.style.height = '0'
    }
  }

  const handleTransitionEnd = () => {
    const content = contentRef.current as unknown as HTMLDivElement
    if (!isOpen) return

    content.style.height = 'auto'
  }

  useEffect(() => {
    updateHeight()
    const content = contentRef.current as unknown as HTMLDivElement
    content.addEventListener('transitionend', handleTransitionEnd)
  
    return () => {
      content.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [isOpen])
  
  useEffect(() => {
  }, [])

  return (
    <>
      <button
        className={styles['branch']}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <Arrow width='0.6rem' height='0.6rem' state={isOpen} />
        {label}
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
