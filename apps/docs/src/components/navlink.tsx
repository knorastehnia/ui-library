import Link from 'next/link'
import { Button, type ButtonProps } from '@kaynora/ui'
import { useRef } from 'react'

interface NavLinkProps extends ButtonProps {
  action?: never
  href: string
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  surface='text',
}) => {
  const nextLinkRef = useRef<HTMLAnchorElement>(null)
  const buttonRef = useRef<HTMLElement>(null)

  const passFocus = (e: React.FocusEvent) => {
    if (e.target === nextLinkRef.current) {
      buttonRef.current?.focus()
      nextLinkRef.current.tabIndex = -1
    }
  }

  const resetTabIndex = (e: React.FocusEvent) => {
    if (!nextLinkRef.current) return

    if (!e.currentTarget.contains(e.relatedTarget)) {
      nextLinkRef.current.tabIndex = 0
    }
  }

  return (
    <Link
      href={href}
      onFocus={passFocus}
      onBlur={resetTabIndex}
      ref={nextLinkRef}
    >
      <Button
        surface={surface}
        internal={{
          root: {
            tabIndex: -1,
            ref: buttonRef,
            "aria-hidden": "true",
          }
        }}
      >
        {children}
      </Button>
    </Link>
  )
}

export { NavLink }
