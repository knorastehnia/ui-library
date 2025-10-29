import { useEffect } from 'react'

const useCollapseEffect = (
  ref: React.RefObject<HTMLDivElement | null>,
  state: boolean,
  duration: number,
) => {
  const updateHeight = () => {
    const content = ref.current
    if (!content) return

    if (state) {
      content.style.height = `${content.scrollHeight}px`
    } else {
      content.style.height = `${content.scrollHeight}px`
      void content.offsetHeight // force reflow
      content.style.height = '0'
    }
  }

  const setHeightAuto = () => {
    const content = ref.current
    if (!state || !content) return

    content.style.height = 'auto'
  }


  useEffect(() => {
    updateHeight()
    const transitionEnd = setTimeout(setHeightAuto, duration)

    return () => {
      clearTimeout(transitionEnd)
    }
  }, [state])
}

export { useCollapseEffect }
