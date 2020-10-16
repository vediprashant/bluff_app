const cardsMapperToString = (cards, boolFormat=false) => {
  let helperArray = new Array(156).fill(boolFormat ? false : "0");
  for (let card = 0; card < cards.length; card++) {
    helperArray[cards[card] - 1] = (boolFormat ? true : "1");
  }
  if (boolFormat) return helperArray
  const stringCards = helperArray.join("");
  return stringCards;
};
export default cardsMapperToString;
