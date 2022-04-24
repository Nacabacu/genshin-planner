// TODO: find a better way to detect the overflow
export function isBodyOverflow(element: HTMLElement, itemHeight: number) {
  return element.offsetTop + element.offsetHeight + itemHeight > document.body.clientHeight;
}
