import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLocalUsersStore } from "../../stores/users-local.store";
import { fetchCombinedUser } from "../../services/user.service";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/__authenticated/users_/$userId/edit")({
  component: UserEditPage,
});

function UserEditPage() {
  const queryClient = useQueryClient();
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

  // src/routes/__authenticated/users_.$userId.edit.tsx
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUser(Number(userId), form);

    // also update local state form so the page shows the new values immediately
    setForm((prev) => ({ ...prev, ...form }));

    // Invalidate the detail query for this user (userId is a string param)
    queryClient.invalidateQueries({ queryKey: ["user", userId] });

    // Invalidate users list queries — be explicit for the page/perPage you use:
    queryClient.invalidateQueries({ queryKey: ["users", 1, 10] });

    // Or, to invalidate any query starting with "users":
    // queryClient.invalidateQueries({
    //   predicate: (query) => query.queryKey?.[0] === "users"
    // });

    navigate({ to: "/users/$userId", params: { userId } });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit User {userId}</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
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
