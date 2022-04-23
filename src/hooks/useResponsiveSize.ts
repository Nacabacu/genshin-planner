import { useLayoutEffect, useState } from 'react';

export enum ScreenSize {
  MobilePortrait = 'mobilePortrait',
  MobileLandScape = 'mobileLandScape',
  Tablet = 'tablet',
  Desktop = 'desktop',
}
const TABLET_BREAKPOINT = 1024;
const MOBILE_LANDSCAPE_BREAKPOINT = 768;
const MOBILE_PORTRAIT_BREAKPOINT = 540;

function getScreenSize(width: number): ScreenSize {
  if (width < MOBILE_PORTRAIT_BREAKPOINT) return ScreenSize.MobilePortrait;
  if (width < MOBILE_LANDSCAPE_BREAKPOINT) return ScreenSize.MobileLandScape;
  if (width < TABLET_BREAKPOINT) return ScreenSize.Tablet;

  return ScreenSize.Desktop;
}

function useResponsiveSize() {
  const [isMobileSize, setIsMobileSize] = useState<ScreenSize>(getScreenSize(window.innerWidth));

  useLayoutEffect(() => {
    function onWindowResize() {
      setIsMobileSize(getScreenSize(window.innerWidth));
    }

    window.addEventListener('resize', onWindowResize);

    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return isMobileSize;
}

export default useResponsiveSize;
