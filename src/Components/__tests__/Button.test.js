import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Button from "../Button";

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

it("Should render desired text on Button", () => {
  act(() => {
    render(<Button text={"Play"} />, container);
  });
  expect(container.textContent).toBe("Play");

  act(() => {
    render(<Button text="Pass" />, container);
  });
  expect(container.textContent).toBe("Pass");

  act(() => {
    render(<Button text="Show" />, container);
  });
  expect(container.textContent).toBe("Show");
});
