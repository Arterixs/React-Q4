export const getAmountCards = (amount: number) => {
  const amountCards = [];
  const defaultAmountElems = 10;
  let countLoop = 1;
  while (countLoop <= amount) {
    amountCards.push(defaultAmountElems * countLoop);
    countLoop += 1;
  }
  return amountCards;
};
