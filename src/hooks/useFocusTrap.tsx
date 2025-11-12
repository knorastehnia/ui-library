import { useCallback, useEffect, useRef } from 'react'

const useFocusTrap = (
  ref: React.RefObject<HTMLDivElement | null>,
  state: boolean,
) => {
  const tabbableItems = useRef<HTMLElement[]>([])

  const getDescendants = (element: HTMLElement) => {
    const children = Array.from(element.children) as HTMLElement[]

    if (children.length > 0) {
      const tabbableItemsFound = children.flatMap((child) => {
        if (child.tabIndex >= 0 && !child.hasAttribute('disabled')) {
          return child
        } else {
          return []
        }
      })

      tabbableItems.current = [...tabbableItems.current, ...tabbableItemsFound]

      children.forEach((child) => {
        return getDescendants(child)
      })
    }
  }

  const checkFocusLocation = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !ref.current) return

    tabbableItems.current = []
    getDescendants(ref.current)

    const items = tabbableItems.current
    const active = document.activeElement

    if (
      (active === items.at(0) && e.shiftKey) ||
      (active === items.at(-1) && !e.shiftKey)
    ) {
      e.preventDefault()
    }

    if (
      active !== null &&
      !items.includes(active as HTMLElement) &&
      active !== ref.current
    ) {
      e.preventDefault()
      items.at(0)?.focus()
    }
  }, [])

  useEffect(() => {
    if (state) {
      document.addEventListener('keydown', checkFocusLocation)
    }

    return () => {
      document.removeEventListener('keydown', checkFocusLocation)
    }
  }, [state, checkFocusLocation])
}

export { useFocusTrap }
