import { useEffect, useRef } from 'react'

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    let currentY = 0
    let targetY = 0
    let animationId = null
    
    const ease = 0.08 // Lower = smoother, higher = snappier
    
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor
    }
    
    const updateScroll = () => {
      currentY = lerp(currentY, targetY, ease)
      
      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateY(${-currentY}px)`
      }
      
      if (Math.abs(targetY - currentY) > 0.1) {
        animationId = requestAnimationFrame(updateScroll)
      }
    }
    
    const handleScroll = () => {
      targetY = window.pageYOffset
      
      if (!animationId) {
        updateScroll()
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div 
      ref={scrollRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  )
}

export default SmoothScroll