const generateSuccessionArray = (start: number, end: number) => Array.from(new Array(end + 1).keys()).slice(start);

export const generatePageArray = (
  localCurrent: number,
  pageNumber: number,
  offset: number,
  prevSymbol: React.MutableRefObject<symbol>,
  nextSymbol: React.MutableRefObject<symbol>
) => {
  const offsetRadius = Math.floor(offset / 2);
  if (pageNumber > 10) {
    if (localCurrent + offsetRadius < pageNumber && localCurrent - offsetRadius > 1) {
      const successionArray = generateSuccessionArray(localCurrent - offsetRadius, localCurrent + offsetRadius);
      if (localCurrent + offsetRadius + 1 === pageNumber) {
        return [1, prevSymbol.current, ...successionArray, pageNumber];
      }
      if (localCurrent - offsetRadius - 1 === 1) {
        return [1, ...successionArray, nextSymbol.current, pageNumber];
      }
      return [1, prevSymbol.current, ...successionArray, nextSymbol.current, pageNumber];
    }
    if (localCurrent + offsetRadius >= pageNumber) {
      return [1, prevSymbol.current, ...generateSuccessionArray(pageNumber - offset + 1, pageNumber)];
    }
    if (localCurrent - offsetRadius <= 1) {
      return [...generateSuccessionArray(1, offset), nextSymbol.current, pageNumber];
    }
  }
  return generateSuccessionArray(1, pageNumber);
};
