import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./root-reducer.js";
import thunkMiddleware from 'redux-thunk';

const middlewareEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default createStore(rootReducer, middlewareEnhancer);
