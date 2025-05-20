import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../shared/api/auth.service';

interface UserState {
    id: string | null;
    email: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    id: null,
    email: null,
    status: 'idle',
    error: null,
};

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await authService.register(email, password);
        authService.setToken(response.token);
        return response.user;
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await authService.login(email, password);
        authService.setToken(response.token);
        return response.user;
    }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
    authService.logout();
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state) => {
                state.status = 'failed';
                state.error = 'Registration failed';
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = 'failed';
                state.error = 'Login failed';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.id = null;
                state.email = null;
                state.status = 'idle';
                state.error = null;
            });
    },
});

export default userSlice.reducer;
