import {CommonResponse} from './common.interface';

export interface User extends CommonResponse {
  fullName: string;
  email: string;
  avatar?: string;
  bio?: string;
  userName?: string;
  portfolio?: string;
  facebookId?: string;
  instagramId?: string;
  location?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
export interface SignInResponse extends CommonResponse {
  token: string;
  user: User;
  refreshToken: string;
  accessToken: string;
  expiresIn: number;
}

export interface SignUpRequest extends SignInRequest {
  password: string;
}

export interface UpdateProfile
  extends Omit<User, 'email' | 'fullName' | 'updatedAt' | 'createdAt' | '_id'> {
  fullName?: string;
  avatar?: string;
}

export interface ChangePassword extends Pick<SignInRequest, 'password'> {
  newPassword: string;
}
