import type { TUser } from "./user.types";


// GET /users/:id
export type ApiUserResponse = {
  data: TUser;
};

// GET /users
export type ApiUsersListResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TUser[];
};

// PATCH /users/:id
export type ApiUpdateUserResponse = {
  updatedAt: string;
};

// POST /register (success)
export type ApiRegisterSuccess = {
  id: string;
  token: string;
};

// POST /register (error)
export type ApiErrorResponse = {
  error: string;
};

// POST /login (success)
export type ApiLoginSuccess = {
  token: string;
};
