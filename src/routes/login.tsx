import {
  createFileRoute,
  redirect,
  useNavigate,
  Link,
} from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";
import { useLocalUsersStore } from "../stores/users-local.store";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const { user } = useAuthUserStore.getState();
    if (user) {
      throw redirect({ to: "/users" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const loginStore = useAuthUserStore((s) => s.loginStore);
  const localUsers = useLocalUsersStore((s) => s.users);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const found = localUsers.find((u) => u.email === form.email);

    if (!found) {
      setError("User not found");
      return;
    }

    loginStore(found);
    navigate({ to: "/users" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ email: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
