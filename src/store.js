import { configureStore } from '@reduxjs/toolkit';
import authedUser from "./reducers/authedUser";
import users from "./reducers/users";
import questions from "./reducers/questions";
import customMiddleware from "./middleware";

export const store = configureStore({
    reducer: { authedUser, users, questions },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});
