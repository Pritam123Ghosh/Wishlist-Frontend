import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "wishList/state",
    initialState: {
        deleteConfirmation: false,
        selectedWish: "",
        newDialog: false,
        filterDialog: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload;
        },
        setSelectedWish: (state, action) => {
            state.selectedWish = action.payload;
        },
        toggleNewDialog: (state, action) => {
            state.newDialog = action.payload;
        },
        toggleFilterDialog: (state, action) => {
            state.filterDialog = action.payload;
        },
    },
});

export const {
    toggleDeleteConfirmation,
    setSelectedWish,
    toggleNewDialog,
    toggleFilterDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
