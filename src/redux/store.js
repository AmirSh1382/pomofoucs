// Redux
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk"

// RootReducer
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store