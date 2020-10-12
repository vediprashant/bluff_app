import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PlayerCards from "../PlayerCards";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../reducers/rootReducer";

let container = null;
let store = createStore(reducer);
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Should render desired number of cards", () => {
  const availableCards = Math.floor(Math.random() * 156 + 1);
  const fakeCards =
    "0".repeat(156 - availableCards) + "1".repeat(availableCards);
  const fakeGame = {
    gameState: {
      self: {
        cards: fakeCards,
      },
    },
  };
  store.getState().game = fakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <PlayerCards />
      </Provider>,
      container
    );
  });
  const cards = container.getElementsByClassName("card");
  expect(cards.length).toEqual(availableCards);
});

it("Should add selected class by clicking on a card ", () => {
  const availableCards = Math.floor(Math.random() * 156 + 1);
  const fakeCards =
    "0".repeat(156 - availableCards) + "1".repeat(availableCards);
  const fakeGame = {
    gameState: {
      self: {
        cards: fakeCards,
      },
    },
  };
  store.getState().game = fakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <PlayerCards />
      </Provider>,
      container
    );
  });
  const cards = container.getElementsByClassName("card");
  const selectedCardsLength = Math.floor(Math.random() * availableCards + 1);
  for (let i = 0; i < selectedCardsLength; i++) {
    fireEvent.click(cards[i]);
  }
  const selectedCards = container.getElementsByClassName("selected");
  expect(selectedCards.length).toEqual(selectedCardsLength);
});

it("Should remove selected class by clicking on a selected card ", () => {
  const availableCards = Math.floor(Math.random() * 156 + 1);
  const fakeCards =
    "0".repeat(156 - availableCards) + "1".repeat(availableCards);
  const fakeGame = {
    gameState: {
      self: {
        cards: fakeCards,
      },
    },
  };
  store.getState().game = fakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <PlayerCards />
      </Provider>,
      container
    );
  });
  const cards = container.getElementsByClassName("card");
  const selectedCardsLength = Math.floor(Math.random() * availableCards + 1);
  for (let i = 0; i < selectedCardsLength; i++) {
    fireEvent.click(cards[i]);
  }
  const toggleSelectionLength = Math.floor(
    Math.random() * selectedCardsLength + 1
  );
  for (let i = 0; i < toggleSelectionLength; i++) {
    fireEvent.click(cards[i]);
  }
  const selectedCards = container.getElementsByClassName("selected");
  expect(selectedCards.length).toEqual(
    selectedCardsLength - toggleSelectionLength
  );
});
