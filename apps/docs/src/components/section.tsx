'use client'

import { Layout } from '@kaynora/ui'

const Section = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
  return (
    <Layout.Section>
      {children}
    </Layout.Section>
  )
}

export { Section }
