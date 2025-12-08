import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";
import { useLocalUsersStore } from "../stores/users-local.store";

export function useRegisterPage() {
  const loginStore = useAuthUserStore((s) => s.loginStore);
  const addUser = useLocalUsersStore((s) => s.addUser);
  const users = useLocalUsersStore((s) => s.users);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleRegister = (formData: { email: string; username: string }) => {
    if (users.some((u) => u.email === formData.email)) {
      setError("Email already registered");
      return;
    }
    const newUser = {
      id: Date.now(),
      email: formData.email,
      first_name: formData.username,
      last_name: "",
      avatar: "/profile-avatar.png",
    };
    addUser(newUser);
    loginStore(newUser);
    navigate({ to: "/users" });
  };
  return { error, handleRegister };
}
