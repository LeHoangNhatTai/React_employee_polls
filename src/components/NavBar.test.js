import '@testing-library/jest-dom';
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from '../actions/authedUser';
import NavBar from './NavBar';
import { store } from "../store";

describe("NavBar", () => {
    it("render the component and displays all expected links", async () => {
        await store.dispatch(handleInitialData());
        await store.dispatch(setAuthedUser("mtsamis"));
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NavBar/>
                </BrowserRouter>
            </Provider>
        );

        expect(component).toBeDefined();
    });

    it("will display the exact information of the logged in user", async () => {
        await store.dispatch(handleInitialData());
        await store.dispatch(setAuthedUser("mtsamis"));
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NavBar/>
                </BrowserRouter>
            </Provider>
        );

        const userInfoEl = component.getByTestId("user-info");
        expect(userInfoEl.textContent).toBe("mtsamis");
    });
});