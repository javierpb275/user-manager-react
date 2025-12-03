import type { ApiUpdateUserResponse, ApiUserResponse, ApiUsersListResponse } from "../types/api.types";
import { api } from "./api.service";


export async function fetchUsers(page = 1, perPage = 10): Promise<ApiUsersListResponse> {
  const res = await api.get<ApiUsersListResponse>("/users", {
    params: { page, per_page: perPage },
  });
  return res.data;
}

export async function fetchUser(id: number): Promise<ApiUserResponse> {
  const res = await api.get<ApiUserResponse>(`/users/${id}`);
  return res.data;
}

export async function updateUser(
  id: number,
  payload: Partial<{ email: string; first_name: string; last_name: string }>
): Promise<ApiUpdateUserResponse> {
  const res = await api.patch<ApiUpdateUserResponse>(`/users/${id}`, payload);
  return res.data;
}
