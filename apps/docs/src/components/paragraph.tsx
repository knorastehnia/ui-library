'use client'

import { T } from '@kaynora/ui'

const P = ({ children }: { children: React.ReactNode }) => {
  return (
    <T
      type='p'
      internal={{
        root: {
          style: { marginBottom: '10px' }
        }
      }}
    >{children}</T>
  )
}

export { P }
