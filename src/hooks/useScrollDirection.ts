import { useState, useEffect, useRef } from 'react';

interface UseScrollDirectionOptions {
  threshold?: number;
  topThreshold?: number;
}

export function useScrollDirection({
  threshold = 8,
  topThreshold = 40,
}: UseScrollDirectionOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      let currentScrollY = 0;

      // Extract scroll position from event target or window
      if (e?.target && e.target !== document) {
        const el = e.target as HTMLElement;
        if (el.scrollTop !== undefined) {
          currentScrollY = el.scrollTop;
        }
      }

      if (!currentScrollY) {
        currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      }

      // Always show when close to the top of the page
      if (currentScrollY <= topThreshold) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      // Ignore micro-scroll jitter below the threshold
      if (Math.abs(diff) < threshold) {
        return;
      }

      if (diff > 0) {
        // Scrolling DOWN (swiping up into content) -> Hide header to maximize screen space
        setIsVisible(false);
      } else {
        // Scrolling UP (swiping down towards top) -> Show header so user can navigate
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Capture phase listener to detect scrolls on both window and inner containers
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true } as any);
    };
  }, [threshold, topThreshold]);

  return isVisible;
}
