import { useEffect } from 'react'

export const useLenis = () => {
  useEffect(() => {
    // Simple smooth scrolling with CSS
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px;
      }
      
      body {
        overflow-x: hidden;
      }
      
      * {
        scroll-behavior: smooth;
      }
      
      /* Smooth scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.3);
        border-radius: 4px;
        transition: background 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0,0,0,0.5);
      }
    `
    document.head.appendChild(style)
    
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style)
      }
    }
  }, [])
}