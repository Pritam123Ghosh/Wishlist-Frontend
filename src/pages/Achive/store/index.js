import { combineReducers } from "@reduxjs/toolkit";
import state from "./stateSlice";
import data from "./dataSlice";

const AchievedWishreducer = combineReducers({
    state,
    data,
});

export default AchievedWishreducer;