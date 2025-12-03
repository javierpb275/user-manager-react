import {
  createFileRoute,
  redirect,
  useNavigate,
  Link,
} from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";
import { useLocalUsersStore } from "../stores/users-local.store";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    const { user } = useAuthUserStore.getState();
    if (user) {
      throw redirect({ to: "/users" });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  const loginStore = useAuthUserStore((s) => s.loginStore);
  const addUser = useLocalUsersStore((s) => s.addUser);
  const users = useLocalUsersStore((s) => s.users);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (users.some((u) => u.email === form.email)) {
      setError("Email already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      email: form.email,
      first_name: form.username,
      last_name: "",
      avatar: "",
    };

    addUser(newUser);
    loginStore(newUser);

    navigate({ to: "/users" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
