import Link from 'next/link'
import { Button, type ButtonProps } from '@kaynora/ui'

interface NavLinkProps extends ButtonProps {
  action?: never
  href: string
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  surface='text',
}) => {
  return (
    <Link href={href} tabIndex={-1}>
      <Button surface={surface}>
        {children}
      </Button>
    </Link>
  )
}

export { NavLink }
