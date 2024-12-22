import { combineReducers } from "@reduxjs/toolkit";
import state from "./stateSlice";
import data from "./dataSlice";

const Wishreducer = combineReducers({
    state,
    data,
});

export default Wishreducer;