const cardsHandler = (cards) => {
  const newCards = cards.map((num) => {
    let rank, suit;
    if (num % 12 === 0) {
      rank = num / 12;
    } else {
      rank = Math.floor(num / 12) + 1;
    }
    if (num % 3 === 0) {
      suit = (num / 3) % 4;
    } else {
      suit = Math.floor(num / 3 + 1) % 4;
    }
    switch (suit) {
      case 0:
        suit = "S";
        break;
      case 1:
        suit = "C";
        break;
      case 2:
        suit = "D";
        break;
      case 3:
        suit = "H";
        break;
      default:
        break;
    }
    return `${rank}${suit}`;
  });
  return newCards;
};

export default cardsHandler;
