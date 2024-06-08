import '@testing-library/jest-dom';
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from 'redux';
import reducer from "../reducers";
import middleware from "../middleware";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from '../actions/authedUser';
import NewPoll from "./NewPoll";

describe("NewPoll", () => {
    it("renders the component", () => {
        const store = createStore(reducer,middleware);
        store.dispatch(handleInitialData());
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("handle input changes correctly", () => {
        const store = createStore(reducer,middleware);
        store.dispatch(handleInitialData());
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll />
                </BrowserRouter>
            </Provider>
        );

        const optionOneLabelElement = component.getByTestId("optionOneLabel");
        const optionOneValueInputElement = component.getByTestId("optionOneValue");
        expect(optionOneLabelElement.textContent).toBe("Option One");

        fireEvent.change(optionOneValueInputElement, { target: { value: 'test first' } });
        expect(optionOneValueInputElement.value).toBe("test first");
    });

    it("should display Second Option elements", () => {
        const store = createStore(reducer,middleware);
        store.dispatch(handleInitialData());
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll />
                </BrowserRouter>
            </Provider>
        );

        const optionTwoLabelElement = component.getByTestId("optionTwoLabel");
        const optionTwoValueInputElement = component.getByTestId("optionTwoValue");
        expect(optionTwoLabelElement.textContent).toBe("Option Two");

        fireEvent.change(optionTwoValueInputElement, { target: { value: 'test second' } });
        expect(optionTwoValueInputElement.value).toBe("test second");
    });

    it("should submit the form correctly", () => {
        const store = createStore(reducer,middleware);
        store.dispatch(handleInitialData());
        store.dispatch(setAuthedUser("mtsamis"));
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll />
                </BrowserRouter>
            </Provider>
        );

        const optionOneLabelElement = component.getByTestId("optionOneLabel");
        const optionOneValueInputElement = component.getByTestId("optionOneValue");
        const optionTwoLabelElement = component.getByTestId("optionTwoLabel");
        const optionTwoValueInputElement = component.getByTestId("optionTwoValue");
        const buttonSubmitElement = component.getByTestId("buttonSubmit");

        expect(optionOneLabelElement.textContent).toBe("Option One");
        expect(optionTwoLabelElement.textContent).toBe("Option Two");
        expect(buttonSubmitElement.textContent).toBe("Submit");

        fireEvent.change(optionOneValueInputElement, { target: { value: 'TestOptionOne' } });
        fireEvent.change(optionTwoValueInputElement, { target: { value: 'TestOptionTwo' } });
        expect(optionOneValueInputElement.value).toBe("TestOptionOne");
        expect(optionTwoValueInputElement.value).toBe("TestOptionTwo");
    });
});