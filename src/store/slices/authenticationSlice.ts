import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthType, User, UserLogin, UserResponse, UserUpdate } from '../types';
import { getToken } from '../../utils/localStorage';

const token = `Token ${getToken()}`;

const initialState: AuthType = {
  user: null,
  loading: false,
  error: null,
};

export const registration = createAsyncThunk('authentication/register', async (data: User): Promise<UserResponse> => {
  const { username, email, password } = data;
  const res = await axios.post(
    'https://blog.kata.academy/api/users',
    {
      user: {
        username,
        email,
        password,
      },
    },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
  );
  return res.data.user;
});

export const login = createAsyncThunk('authentication/login', async (data: UserLogin): Promise<UserResponse> => {
  const { email, password } = data;
  const res = await axios.post(
    'https://blog.kata.academy/api/users/login',
    {
      user: {
        email,
        password,
      },
    },
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
  );
  return res.data.user;
});

export const getUser = createAsyncThunk('authentication/getUser', async () => {
  const res = await axios.get('https://blog.kata.academy/api/user', {
    headers: {
      Authorization: token,
    },
  });
  return res.data.user;
});

export const updateProfile = createAsyncThunk(
  'authentication/updateProfile',
  async (data: UserUpdate): Promise<UserResponse> => {
    const { username, email, password, image } = data;
    const res = await axios.put(
      'https://blog.kata.academy/api/user',
      {
        user: {
          username,
          email,
          token,
          password,
          bio: 'I am a programmer',
          image,
        },
      },
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: token,
        },
      }
    );
    return res.data.user;
  }
);

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    deleteUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    // Registration
    [registration.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registration.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [registration.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login
    [login.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [login.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get User
    [getUser.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUser.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Profile
    [updateProfile.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateProfile.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateProfile.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { deleteUser } = authSlice.actions;
export default authSlice.reducer;
