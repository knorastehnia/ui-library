'use client'

import { Typography, Button } from '@kaynora/ui'
import Link from 'next/link'

const H1 = ({ children }: { children: React.ReactNode }) => (
  <Typography
    type='h1'
    weight='500'
    internal={{
      root: {
        style: { marginBottom: '20px' }
      }
    }}
  >{children}</Typography>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <Typography
    type='h2'
    size='s'
    weight='400'
    internal={{
      root: {
        style: { marginBottom: '10px', marginTop: '40px' }
      }
    }}
  >{children}</Typography>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <Typography type='h3'>{children}</Typography>
)

const H4 = ({ children }: { children: React.ReactNode }) => (
  <Typography type='h4'>{children}</Typography>
)

const Span = ({ children }: { children: React.ReactNode }) => (
  <Typography>{children}</Typography>
)

const Strong = ({ children }: { children: React.ReactNode }) => (
  <Typography type='span' weight='500'>{children}</Typography>
)

const A = ({ children, href }: { children: React.ReactNode, href: string }) => (
  <Link href={href}>
    <Button surface='text'>
      <Typography>{children}</Typography>
    </Button>
  </Link>
)

export {
  H1,
  H2,
  H3,
  H4,
  Span,
  Strong,
  A,
}
