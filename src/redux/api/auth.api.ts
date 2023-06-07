import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from '../../models/auth.interface';
import {baseApi} from '../../services/baseApi';

const signUpUrl = 'auth/register';
const login = 'auth/local/';
const logOut = 'auth/logout';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<SignInResponse, SignUpRequest>({
      query: body => ({
        url: signUpUrl,
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({
        url: login,
        method: 'POST',
        body,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: logOut,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignInMutation,
  useSignUpMutation,

  useLogOutMutation,
} = authApi;
