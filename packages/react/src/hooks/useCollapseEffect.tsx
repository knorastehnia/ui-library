import { useEffect, useLayoutEffect } from 'react'

const useCollapseEffect = (
  ref: React.RefObject<HTMLDivElement | null>,
  state: boolean,
  duration: number,
  onTransitionStart?: (state: boolean) => void,
  onTransitionEnd?: (state: boolean) => void,
) => {
  const open = () => {
    const content = ref.current
    if (!content) return

    content.style.height = `${content.scrollHeight}px`
  }

  const close = () => {
    const content = ref.current
    if (!content) return

    content.style.height = `${content.scrollHeight}px`
    void content.offsetHeight // force reflow
    content.style.height = '0'
  }

  const setHeightAuto = () => {
    const content = ref.current
    if (!state || !content) return

    content.style.height = 'auto'
  }

  useLayoutEffect(() => {
    onTransitionStart?.(state)
  }, [state])

  useEffect(() => {
    let raf: number
    let transitionEnd: NodeJS.Timeout

    raf = requestAnimationFrame(() => {
      if (state) {
        open()
      } else {
        close()
      }

      transitionEnd = setTimeout(() => {
        setHeightAuto()
        onTransitionEnd?.(state)
      }, duration)
    })

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(transitionEnd)
    }
  }, [state])
}

export { useCollapseEffect }
