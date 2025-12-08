import { useState } from "react";
import { useAuthUserStore } from "../stores/auth-user.store";
import { useLocalUsersStore } from "../stores/users-local.store";
import { useNavigate } from "@tanstack/react-router";

export function useLoginPage() {
  const loginStore = useAuthUserStore((s) => s.loginStore);
  const localUsers = useLocalUsersStore((s) => s.users);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleLogin = (email: string) => {
    const foundUser = localUsers.find((u) => u.email === email);
    if (!foundUser) {
      setError("User not found");
      return;
    }
    loginStore(foundUser);
    navigate({ to: "/users" });
  };
  return { error, handleLogin };
}
