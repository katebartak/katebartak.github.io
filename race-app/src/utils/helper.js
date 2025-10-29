/**
 * Scrolls a child element into view within a scrollable container, with an optional offset from the top.
 * @param {HTMLElement} child - The child element to scroll to.
 * @param {HTMLElement} container - The scrollable container element.
 * @param {number} [offset=0] - The offset in pixels from the top of the container.
 */
export function scrollToChildInContainer(child, container, offset = 0) {
  if (!child || !container) return;
  const childRect = child.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const scrollTop = childRect.top - containerRect.top + container.scrollTop - offset;
  container.scrollTo({ top: scrollTop, behavior: 'smooth' });
}
export function getRandomUniqueColor() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

export function getRandomUniqueColorList(count) {
  const colors = new Set();

  while (colors.size < count) {
    colors.add(getRandomUniqueColor());
  }

  return Array.from(colors);
}
