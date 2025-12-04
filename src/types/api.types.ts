import type { TUser } from "./user.types";

export type ApiUserResponse = {
  data: TUser;
};

export type ApiUsersListResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TUser[];
};

export type ApiUpdateUserResponse = {
  updatedAt: string;
};

export type ApiRegisterSuccess = {
  id: string;
  token: string;
};

export type ApiErrorResponse = {
  error: string;
};

export type ApiLoginSuccess = {
  token: string;
};
