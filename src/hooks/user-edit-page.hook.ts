import { useEffect, useState } from "react";
import { useLocalUsersStore } from "../stores/users-local.store";
import { fetchCombinedUser } from "../services/user.service";
import { useQueryClient } from "@tanstack/react-query";

export function useUserEditPage(userId: string) {
  const queryClient = useQueryClient();
  const updateUser = useLocalUsersStore((s) => s.updateUser);
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
        if (!res || !res.data) {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(Number(userId), form);
    queryClient.invalidateQueries({ queryKey: ["user", userId] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };
  return { form, setForm, handleSubmit, loading, notFound };
}
