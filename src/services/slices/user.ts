import { createSlice } from "@reduxjs/toolkit";

export type TAuthState = {
  authorized: boolean;
  token: string | null;
};

const authInitialState: TAuthState = {
  authorized: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    signIn: (state) => ({
      ...state,
      authorized: true,
    }),
    signOut: () => ({
      ...authInitialState,
    }),
  },
});

export const authReducer = authSlice.reducer;
export const { signIn, signOut } = authSlice.actions;
