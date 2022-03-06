export const getRectDimensions = (elem: any) => {
  const dimensions = elem.getBoundingClientRect();
  const { x, y, height, width, top } = dimensions;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return {
    x,
    y,
    height,
    width,
    top: top + scrollTop
  };
};
