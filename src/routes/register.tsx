import {
  createFileRoute,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";
import { useState } from "react";
import { registerUser } from "../services/auth.service";

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
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await registerUser(form);

      const user = {
        id: Number(res.id),
        email: form.email,
        first_name: form.username,
        last_name: "",
        avatar: "",
      };

      loginStore(user, res.token);

      navigate({ to: "/users" });
    } catch (err: any) {
      setError(err.response?.data?.error ?? "Register failed");
    }
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

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
