import { thunk } from "redux-thunk";
import logger from "./logger";

const customMiddleware = [thunk, logger];

export default customMiddleware;