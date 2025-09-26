import { useEffect } from 'react';

export function useIframeHeight() {
  useEffect(() => {
    const sendHeight = () => {
      if (window.parent !== window) {
        const height = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          600 // minimum height
        );
        
        window.parent.postMessage({
          type: 'dmi_height',
          height: height
        }, '*');
      }
    };

    // Send height immediately
    sendHeight();
    
    // Send height on resize
    window.addEventListener('resize', sendHeight);
    
    // Send height when content changes (with small delay)
    const observer = new MutationObserver(() => {
      setTimeout(sendHeight, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, []);
}
