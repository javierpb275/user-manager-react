// src/routes/login.tsx
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const authUser = useAuthUserStore.getState().authUser;
    if (authUser) {
      throw redirect({ to: "/users" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const loginStore = useAuthUserStore((state) => state.loginStore);
  const navigate = useNavigate();

  const handleLogin = () => {
    loginStore({ id: "1", name: "John" });
    navigate({ to: "/users" });
  };

  return (
    <div>
      <h1>Login Form</h1>
      <button onClick={handleLogin}>Simulate Login</button>
    </div>
  );
}
