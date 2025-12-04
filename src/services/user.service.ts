import { useLocalUsersStore } from "../stores/users-local.store";
import { api } from "./api.service";
import type { ApiUsersListResponse, ApiUserResponse } from "../types/api.types";

export async function fetchUsers(page = 1, perPage = 10) {
  const res = await api.get<ApiUsersListResponse>("/users", {
    params: { page, per_page: perPage },
  });
  return res.data;
}

export async function fetchUser(id: number) {
  const res = await api.get<ApiUserResponse>(`/users/${id}`);
  return res.data;
}

export async function fetchCombinedUsers(page = 1, perPage = 10) {
  const apiRes = await fetchUsers(page, perPage);
  const { users: local } = useLocalUsersStore.getState();
  const merged = apiRes.data.map(
    (u) => local.find((lu) => lu.id === u.id) || u
  );
  const notInApi = local.filter(
    (u) => !apiRes.data.some((apiU) => apiU.id === u.id)
  );
  return {
    ...apiRes,
    data: [...merged, ...notInApi],
  };
}

export async function fetchCombinedUser(id: number) {
  const { users: local } = useLocalUsersStore.getState();
  const localUser = local.find((u) => u.id === id);
  if (localUser) {
    return { data: localUser };
  }
  const apiRes = await fetchUser(id);
  return { data: apiRes.data };
}
