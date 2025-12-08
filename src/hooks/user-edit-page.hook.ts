import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useLocalUsersStore } from "../stores/users-local.store";
import { fetchCombinedUser } from "../services/user.service";
import { useQueryClient } from "@tanstack/react-query";

export function useUserEditPage(userId: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateUser = useLocalUsersStore((s) => s.updateUser);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  useEffect(() => {
    fetchCombinedUser(Number(userId)).then((res) => {
      setForm({
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
        avatar: res.data.avatar,
      });
    });
  }, [userId]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(Number(userId), form);
    setForm((prev) => ({ ...prev, ...form }));
    queryClient.invalidateQueries({ queryKey: ["user", userId] });
    queryClient.invalidateQueries({ queryKey: ["users", 1, 10] });
    navigate({ to: "/users/$userId", params: { userId } });
  };
  return { form, setForm, handleSubmit };
}
