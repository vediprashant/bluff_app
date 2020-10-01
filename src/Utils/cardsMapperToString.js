const cardsMapperToString = (cards) => {
  let helperArray = new Array(156).fill("0");
  for (let card = 0; card < cards.length; card++) {
    helperArray[cards[card] - 1] = "1";
  }
  const stringCards = helperArray.join("");
  return stringCards;
};
export default cardsMapperToString;
