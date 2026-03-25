import { createSlice } from "@reduxjs/toolkit";

const TOKEN_KEY = "token";

const initialState = {
    user: null,
    userToken: localStorage.getItem(TOKEN_KEY) || null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        setuserToken: (state, action) => {
            state.userToken = action.payload;
            localStorage.setItem(TOKEN_KEY, action.payload);
        },
        clearUser: (state) => {
            state.user = null;
            state.userToken = null;
            localStorage.removeItem(TOKEN_KEY);
        },
    }
})

export const { setUserDetails,setuserToken,clearUser  } = userSlice.actions;

export default userSlice.reducer;