import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}

const initialState = {
    token: '',
    isAuthenticated: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const {
    setToken,
} = loginSlice.actions;

export default loginSlice.reducer;