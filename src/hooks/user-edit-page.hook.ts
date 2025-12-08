import { useAuthUserStore } from "../stores/auth-user.store";
import { useLocalUsersStore } from "../stores/users-local.store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchCombinedUser } from "../services/user.service";

export function useUserEditPage(userId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const updateUser = useLocalUsersStore((s) => s.updateUser);
  const authUser = useAuthUserStore((s) => s.user);
  const setAuthUser = useAuthUserStore((s) => s.loginStore);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    fetchCombinedUser(Number(userId))
      .then((res) => {
        if (!res?.data) {
          setNotFound(true);
          return;
        }
        setForm({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
          avatar: res.data.avatar,
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [userId]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(Number(userId), form);
    if (authUser?.id === Number(userId)) {
      setAuthUser({ ...authUser, ...form });
    }
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["user", userId] }),
      queryClient.invalidateQueries({ queryKey: ["users"] }),
    ]);
    router.navigate({ to: `/users/${userId}` });
  };
  return { form, setForm, handleSubmit, loading, notFound };
}
