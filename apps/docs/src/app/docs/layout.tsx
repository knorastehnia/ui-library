'use client'

import {
  Layout,
  ThemeProvider,
  T,
  TypographyDefaultsProvider,
  ButtonDefaultsProvider,
  Collapsible,
} from '@kaynora/ui'

import { NavLink } from '@/components/navlink'

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactElement | React.ReactElement[]
}>) {
  return (
    <ThemeProvider>
      <Layout>
        <Layout.TopNav><T>TopNav</T></Layout.TopNav>

        <Layout.SideNav>
          <TypographyDefaultsProvider
            color='dimmed'
            size='s'
          >
            <ButtonDefaultsProvider
              size='s'
              surface='hollow'
              width='full'
            >
              <NavLink surface='hollow' href='/docs/overview'><T>Overview</T></NavLink>
              <NavLink surface='hollow' href='/docs/getting-started'><T>Getting started</T></NavLink>
              <NavLink surface='hollow' href='/docs/accessibility'><T>Accessibility</T></NavLink>
            </ButtonDefaultsProvider>

            <Collapsible
              arrangement='leading'
              size='s'
              label='Components'
              internal={{ typography: { size: 's' } as any }} // eslint-disable-line
            >
              <Collapsible
                arrangement='leading'
                size='s'
                label='Core'
                internal={{ typography: { size: 's' } as any }} // eslint-disable-line
              >
                <NavLink surface='hollow' href='/docs/components/core/breadcrumbs'><T>Breadcrumbs</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/button'><T>Button</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/calendar'><T>Calendar</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/checkbox'><T>Checkbox</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/collapsible'><T>Collapsible</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/context-menu'><T>Context Menu</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/dropdown-menu'><T>Dropdown Menu</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/error-message'><T>Error Message</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/field'><T>Field</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/invisible'><T>Invisible</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/layout'><T>Layout</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/menu'><T>Menu</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/modal'><T>Modal</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/pagination'><T>Pagination</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/popover'><T>Popover</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/radio'><T>Radio</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/select'><T>Select</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/tabs'><T>Tabs</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/theme-provider'><T>Theme Provider</T></NavLink>
                <NavLink surface='hollow' href='/docs/components/core/typography'><T>Typography</T></NavLink>
              </Collapsible>
            </Collapsible>
          </TypographyDefaultsProvider>
        </Layout.SideNav>

        <Layout.Content>
          {children}
        </Layout.Content>
      </Layout>
    </ThemeProvider>
  )
}
