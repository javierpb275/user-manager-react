import { api } from "./api.service";

export type TAuthRequest = {
  username: string;
  email: string;
  password: string;
};

export type TLoginResponse = {
  token: string;
};

export type TRegisterResponse = {
  id: string;
  token: string;
};

export type TErrorResponse = {
  error: string;
};


export async function loginUser(body: TAuthRequest): Promise<TLoginResponse> {
  const res = await api.post("/login", body);
  return res.data;
}

export async function registerUser(
  body: TAuthRequest
): Promise<TRegisterResponse> {
  const res = await api.post("/register", body);
  return res.data;
}
