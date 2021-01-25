import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from 'redux-thunk';

const middlewareEnhancer = applyMiddleware(thunkMiddleware)

export default createStore(rootReducer, middlewareEnhancer);
