/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiAchieveWish, apiCreateWish, apiDeleteWish, apiGetOneWish, apiGetWishList, apiUpdateWish } from '../../../services/HomeService'
import { apiGetAchievedWishList } from '../../../services/AchiveService'

export const getAchievedWishList = createAsyncThunk(
    'wish/data/getWishList',
    async (data) => {
        const response = await apiGetAchievedWishList({
            data,
        })
        return response.data
    }
)

export const getOneWish = createAsyncThunk(
    'wish/data/getOneWish',
    async (id) => {
        const response = await apiGetOneWish(id); // Call the API with the ID
        return response.data; // Return the message data
    }
);


export const deleteWish = createAsyncThunk(
    'wish/data/deleteWish',
    async ({ id, role }) => {
        const response = await apiDeleteWish(id, role);
        return response.data;
    }
);
export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [0, 1, 2],
    productStatus: 0,
}

const dataSlice = createSlice({
    name: 'wishList/data',
    initialState: {
        loading: false,
        achievedWishList: [],
        oneWish: null,
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateProductList: (state, action) => {
            state.branchList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: (wish) => {
        wish
            .addCase(getAchievedWishList.fulfilled, (state, action) => {
                state.loading = false
                state.achievedWishList = action.payload
                state.tableData.total = action.payload.count
            })
            .addCase(getAchievedWishList.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAchievedWishList.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getOneWish.fulfilled, (state, action) => {
                state.loading = false;
                state.oneWish = action.payload; // Update the `oneWish` state
            })
            .addCase(getOneWish.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOneWish.rejected, (state) => {
                state.loading = false;
            })

            .addCase(deleteWish.fulfilled, (state, action) => { });
    },
})

export const { updateProductList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
