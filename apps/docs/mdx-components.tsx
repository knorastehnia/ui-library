import { H1, H2, H3, H4, P, Strong, A } from '@/components/markdown'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

const components: MDXComponents = {
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  h4: ({ children }) => <H4>{children}</H4>,
  p: ({ children }) => <P>{children}</P>,
  strong: ({ children }) => <Strong>{children}</Strong>,
  a: ({ children, href }) => <A href={href}>{children}</A>
}

export function useMDXComponents(): MDXComponents {
  return components
}
