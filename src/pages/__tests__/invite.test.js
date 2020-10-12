import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ReactTestUtils from 'react-dom/test-utils'
import Invite from '../Invite'


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
    global.fetch.mockRestore;
});

it('shows warning on non-OK response', async () => {
    var apiResponse = { message: ['Random String From Server'] }
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            status: 300,
            json: () => Promise.resolve(apiResponse)
        })
    );

    await act(async () => {
        render(<Invite />, container)
        ReactTestUtils.Simulate.click(
            container.querySelector('button')
        )
    })
    var expectedOutput = `Invalid Input\nmessage: ${apiResponse.message[0]}\n`
    expect(container.querySelector('#inviteWarn').textContent).toBe(expectedOutput)
})

it('sends appropriate data to api ', async () => {
    var inputData = {
        email: 'a@b.com',
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
        render(<Invite />, container)
        ReactTestUtils.Simulate.change(container.querySelectorAll('input')[0],
            { target: { value: inputData.email } }
        )
        setTimeout(() => ReactTestUtils.Simulate.click(container.querySelector('button'), 10))
    })
    expect(requestParams).toEqual(inputData)
})