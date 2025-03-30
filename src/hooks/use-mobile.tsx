
import * as React from "react"

// Points de rupture différents pour différentes tailles d'écran
const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<{
    isMobile: boolean;
    isTablet: boolean;
    width: number | undefined;
  }>({
    isMobile: false,
    isTablet: false,
    width: undefined
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        width
      });
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", handleResize);
    
    // Initialisation immédiate
    handleResize();
    
    // Écouter les changements de taille d'écran
    window.addEventListener('resize', handleResize);
    
    return () => {
      mql.removeEventListener("change", handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}

export function useIsMobile() {
  const { isMobile } = useScreenSize();
  return isMobile;
}

export function useIsTablet() {
  const { isTablet } = useScreenSize();
  return isTablet;
}
