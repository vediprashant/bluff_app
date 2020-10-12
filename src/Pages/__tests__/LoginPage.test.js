// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { fireEvent, waitForElement } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import LoginPage from "../LoginPage";

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

it("renders invalid input message", async () => {
  const fakeUser = {
    email: "pc@jtg.com",
    password: "abcd",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
      status: 400,
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<LoginPage />, container);
    const button = container.querySelector("Button");
    fireEvent.click(button);
  });
  expect(container.textContent).toContain("Please provide valid input");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("renders invalid credentials message", async () => {
  const fakeUser = {
    email: "pc@jtg.com",
    password: "abcd",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "Invalid Credentials" }),
      status: 401,
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<LoginPage />, container);
    const button = container.querySelector("Button");
    fireEvent.click(button);
  });
  expect(container.textContent).toContain("Invalid Credentials");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("renders server error message", async () => {
  const fakeUser = {
    email: "pc@jtg.com",
    password: "abcd",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
      status: 500,
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<LoginPage />, container);
    const button = container.querySelector("Button");
    fireEvent.click(button);
  });
  expect(container.textContent).toContain(
    "Internal Server Error, Please Try Late"
  );

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("renders api error message", async () => {
  const fakeUser = {
    email: "pc@jtg.com",
    password: "abcd",
  };
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.reject("TypeError: Failed to fetch"));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<LoginPage />, container);
    const button = container.querySelector("Button");
    fireEvent.click(button);
  });
  expect(container.textContent).toContain("API Error, Please try Again");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
