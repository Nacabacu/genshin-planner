import { RefObject, useEffect } from 'react';

export function useMouseDownOutside<T extends HTMLElement>(ref: RefObject<T>, onClickOutside: () => void) {
  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!ref.current || !event.target) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', onDocumentClick);

    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
    };
  }, [ref, onClickOutside]);
}
