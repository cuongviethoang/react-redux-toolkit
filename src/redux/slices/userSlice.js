import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
    "users/fetchAllUsers", // tên action muốn dispatch
    async () => {
        const response = await axios.get(
            "http://localhost:8080/api/v1/user/read"
        );
        return response.data;
    }
);

export const deleteUserRedux = createAsyncThunk(
    "users/deleteUser",
    async (userId) => {
        const res = await axios.delete(
            "http://localhost:8080/api/v1/user/delete",
            {
                data: {
                    id: userId,
                },
            }
        );
        return res.data;
    }
);

const initialState = {
    listUsers: [],
    isLoading: false,
    isError: false,
    isDeleting: false,
    isDeletingSuccess: false,
    isDeletingError: false,
};

export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllUsers.pending, (state, action) => {
                // Add user to the state array
                state.isLoading = true;
                state.isError = false;
                state.isDeletingSuccess = false;
                state.isDeletingError = false;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listUsers = action.payload.DT;
                state.isDeletingSuccess = false;
                state.isDeletingError = false;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                // Add user to the state array
                state.isLoading = false;
                state.isError = true;
                state.isDeletingSuccess = false;
                state.isDeletingError = false;
            })
            .addCase(deleteUserRedux.pending, (state, action) => {
                // delete user to the state array
                state.isDeleting = true;
                state.isDeletingSuccess = false;
                state.isDeletingError = false;
            })
            .addCase(deleteUserRedux.fulfilled, (state, action) => {
                // delete user to the state array
                state.isDeleting = false;
                state.isDeletingSuccess = true;
                state.isDeletingError = false;
            })
            .addCase(deleteUserRedux.rejected, (state, action) => {
                // delete user to the state array
                state.isDeleting = false;
                state.isDeletingSuccess = false;
                state.isDeletingError = true;
            });
    },
});

export default userSlice.reducer;
