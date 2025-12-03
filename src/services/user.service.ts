import { useLocalUsersStore } from "../stores/users-local.store";
import type { ApiUsersListResponse, ApiUserResponse } from "../types/api.types";
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

export async function fetchCombinedUsers(page = 1, perPage = 10): Promise<ApiUsersListResponse> {
  const apiRes = await fetchUsers(page, perPage);
  const { users: local } = useLocalUsersStore.getState();

  const merged = apiRes.data.map(
    (u) => local.find((lu) => lu.id === u.id) || u
  );

  const newUsers = local.filter((u) => u.id > 1000);

  return { ...apiRes, data: [...merged, ...newUsers] };
}

export async function fetchCombinedUser(id: number): Promise<ApiUserResponse> {
  const apiRes = await fetchUser(id);
  const { users: local } = useLocalUsersStore.getState();

  const found = local.find((u) => u.id === id);

  return { data: found || apiRes.data };
}
