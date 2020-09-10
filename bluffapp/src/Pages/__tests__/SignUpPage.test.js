import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReactTestUtils from 'react-dom/test-utils'
import SignUpPage from "../SignUpPage";


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


jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve(fakeUser)
    })
);


it('shows warning on non-OK response', async () => {
    var apiResponse = { message: 'Random String From Server' }
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            status: 300,
            json: () => Promise.resolve(apiResponse)
        })
    );

    await act(async () => {
        render(<SignUpPage />, container)
        ReactTestUtils.Simulate.click(
            container.querySelector('button')
        )
    })

    var expectedOutput = `Invalid Input`
    expect(container.querySelector('#signUpWarn span').textContent).toBe(expectedOutput)
})

it('sends appropriate data to api ', async () => {
    var inputData = {
        name: 'naveen',
        email: 'a@b.com',
        password: 'qwerty',
        confirmPassword: 'qwerty'
    }

    var requestParams = null
    var fetch = jest.spyOn(global, "fetch").mockImplementation((url, options) => {
        requestParams = JSON.parse(options.body)
        return Promise.resolve({
            status: 300,
            json: () => Promise.resolve(apiResponse)
        })
    })

    await act(async () => {
        render(<SignUpPage />, container)
        ReactTestUtils.Simulate.change(container.querySelectorAll('input')[0],
            { target: { value: inputData.name } }
        )
        ReactTestUtils.Simulate.change(container.querySelectorAll('input')[1],
            { target: { value: inputData.email } }
        )
        ReactTestUtils.Simulate.change(container.querySelectorAll('input')[2],
            { target: { value: inputData.password } }
        )
        ReactTestUtils.Simulate.change(container.querySelectorAll('input')[3],
            { target: { value: inputData.confirmPassword } }
        )
        setTimeout(() => ReactTestUtils.Simulate.click(container.querySelector('button'), 10))
    })
    var expectedOutput = {...inputData}
    delete expectedOutput.confirmPassword
    expect(requestParams).toEqual(expectedOutput)
})