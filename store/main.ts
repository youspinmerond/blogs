import { createStore } from "@reduxjs/toolkit";

const defaultState = {
  login: false
};

const reducer = (state=defaultState, action: any) => {
  switch(action.type) {
  case "set":
    return { ...state, login: action.payload };
  default:
    return state;
  }
};

const store = createStore(reducer);

export default store;