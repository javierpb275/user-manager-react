import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLocalUsersStore } from "../../stores/users-local.store";
import { fetchCombinedUser } from "../../services/user.service";

export const Route = createFileRoute("/__authenticated/users_/$userId/edit")({
  component: UserEditPage,
});

function UserEditPage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const updateUser = useLocalUsersStore((s) => s.updateUser);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    fetchCombinedUser(Number(userId)).then((res) => {
      setForm({
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
      });
    });
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUser(Number(userId), form);

    navigate({ to: "/users/$userId", params: { userId } });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit User {userId}</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          type="text"
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
