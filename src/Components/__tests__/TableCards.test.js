import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import TableCards from "../TableCards";

let container = null;
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

it("Should render desired number of cards on table", () => {
  const totalCards = Math.floor(Math.random() * 156 + 1);
  act(() => {
    render(<TableCards card_count={totalCards} />, container);
  });
  const tableCards = container.getElementsByClassName("cards");
  expect(tableCards.length).toEqual(totalCards);
});
