import '@testing-library/jest-dom';
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from 'redux';
import Login from "./Login";
import reducer from "../reducers";
import middleware from "../middleware";
import { handleInitialData } from "../actions/shared";

describe("Login", () => {
    it("render the component", () => {
        const store = createStore(reducer);

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('show input element', async () => {
        const store = createStore(reducer);
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        const usernameInputElement = component.getByTestId("username");
        const passwordInputElement = component.getByTestId("password");
        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
    });

    it("valid process submit button", async () => {
        const store = createStore(reducer,middleware);
        await store.dispatch(handleInitialData());
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login/>
                </BrowserRouter>
            </Provider>
        );

        const usernameInputElement = component.getByTestId("username");
        const passwordInputElement = component.getByTestId("password");
        const buttonSubmitElement = component.getByTestId("submit");
        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(buttonSubmitElement).toBeInTheDocument();

        fireEvent.change(usernameInputElement, { target: { value: 'zoshikanlu' } });
        fireEvent.change(passwordInputElement, { target: { value: 'pass246' } });
        expect(usernameInputElement.value).toBe("zoshikanlu");
        expect(passwordInputElement.value).toBe("pass246");
        expect(buttonSubmitElement).toBeEnabled();
        fireEvent.click(buttonSubmitElement);
    });
});