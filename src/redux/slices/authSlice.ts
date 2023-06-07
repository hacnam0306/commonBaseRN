import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SignInResponse} from '../../models/auth.interface';

export interface AuthState {
  isSignedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: state => {
      return initialState;
    },
    /** Set user info and token after signing in successfully */
    signIn: (state, action: PayloadAction<SignInResponse>) => {
      console.log('action', JSON.stringify(action, null, 2));
      state.token = `Bearer ${action.payload.token}`;
    },
    /**
     * After users signing up for the first time we want them to complete their
     * information first and then after completing that, we will set `isSignedIn = true`
     * and redirect user to screens for authenticated users (home, profile, etc.).
     * All the requests from completeuser process need token, so it makes sense
     * to have a token, so that we can make requests.
     */
    signUp: (state, action: PayloadAction<SignInResponse>) => {
      state.isSignedIn = true;
      state.token = action.payload.token;
    },

    /** Explicitly set `isSignedIn` to true */
    setSignedIn: state => {
      state.isSignedIn = true;
    },
  },
});

export const {signOut, signIn, signUp, setSignedIn} = authSlice.actions;

export const authReducer = authSlice.reducer;
