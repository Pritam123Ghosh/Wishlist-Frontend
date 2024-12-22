import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "wishList/state",
    initialState: {
        deleteConfirmation: false,
        selectedAchivedWish: "",
        newDialog: false,
        filterDialog: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload;
        },
        setSelectedAchivedWish: (state, action) => {
            state.selectedAchivedWish = action.payload;
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
    setSelectedAchivedWish,
    toggleNewDialog,
    toggleFilterDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
