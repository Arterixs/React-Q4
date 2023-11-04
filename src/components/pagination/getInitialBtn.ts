export const getInitialBtn = (currentPage: number) => {
  const ARRAY_AMOUNT_BTN = [1, 2, 3];
  const DEFAULT_AMOUNT_BTN = 3;
  if (currentPage > DEFAULT_AMOUNT_BTN) {
    const pages = [];
    let countLoop = 0;
    while (countLoop < DEFAULT_AMOUNT_BTN) {
      pages.push(currentPage + countLoop);
      countLoop += 1;
    }
    return pages;
  }
  return ARRAY_AMOUNT_BTN;
};
