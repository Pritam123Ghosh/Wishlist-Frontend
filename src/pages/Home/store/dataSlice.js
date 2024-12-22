/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiAchieveWish, apiCreateWish, apiDeleteWish, apiGetOneWish, apiGetWishList, apiUpdateWish } from '../../../services/HomeService'

export const getWishList = createAsyncThunk(
    'wish/data/getWishList',
    async (data) => {
        const response = await apiGetWishList({
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


export const createWish = createAsyncThunk(
    'wish/data/createWish',
    async (data) => {
        const response = await apiCreateWish(data)
        return response.data
    }
)

export const updateWish = createAsyncThunk(
    "wish/data/updateWish",
    async ({ id, ...updateData }) => {
        const response = await apiUpdateWish(id, updateData); // Pass id and updateData separately
        return response.data;
    }
);
export const achieveWish = createAsyncThunk(
    "wish/data/achieveWish",
    async ({ id, ...data }) => {
        const response = await apiAchieveWish(id, data); // Pass id and updateData separately
        return response.data;
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
        wishList: [],
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
            .addCase(getWishList.fulfilled, (state, action) => {
                state.loading = false
                state.wishList = action.payload
                state.tableData.total = action.payload.count
            })
            .addCase(getWishList.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getWishList.rejected, (state, action) => {
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
            .addCase(createWish.fulfilled, (state, action) => { })
            .addCase(updateWish.fulfilled, (state, action) => { })
            .addCase(achieveWish.fulfilled, (state, action) => { })
            .addCase(deleteWish.fulfilled, (state, action) => { });
    },
})

export const { updateProductList, setTableData, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
