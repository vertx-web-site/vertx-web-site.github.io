export function getScrollTop() {
  if (typeof window === "undefined") {
    return 0;
  }
  return Math.max(window.pageYOffset,
      document.documentElement.scrollTop, document.body.scrollTop);
}

function scrollTop(top) {
  if (typeof window !== "undefined") {
    document.body.scrollTop = document.documentElement.scrollTop = top;
  }
}

export function smoothScrollTo(endOffset, duration) {
  if (!requestAnimationFrame) {
    scrollTop(endOffset);
  }

  let startOffset = getScrollTop();
  if (startOffset === endOffset) {
    return;
  }

  let distance = endOffset - startOffset;
  let start = undefined;

  let step = timestamp => {
    if (!start) {
      start = timestamp;
    }

    let elapsed = timestamp - start;
    let t = Math.min(1, elapsed / duration);
    let currentOffset = startOffset + distance * (t * (2 - t));
    scrollTop(currentOffset);

    if (t < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};
