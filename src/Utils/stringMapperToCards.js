const stringMapperToCards = (cards) => {
  let cardsList = [];
  for (let card = 0; card < cards.length; card++) {
    if (cards[card] === "1") {
      cardsList.push(card + 1);
    }
  }
  return cardsList;
};
export default stringMapperToCards;
