import '@testing-library/jest-dom';
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { handleInitialData } from '../actions/shared';
import App from "./App";
import { store } from "../store";

describe("App", () => {
  it("render the component", () => {
    const component = render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );

    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("display the Login page if not already logged in", () => {
    const component = render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );
    const loginHeader = component.getByTestId("login-header");
    expect(loginHeader).toBeInTheDocument();
  });

  it("show the Dashboard page if logged in", async () => {
    await store.dispatch(handleInitialData());
    store.dispatch(setAuthedUser("sarahedo"));
    const component = render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );

    const dashboardHeader = component.getByTestId("dashboard-hearder");
    expect(dashboardHeader).toBeInTheDocument();
  });
});