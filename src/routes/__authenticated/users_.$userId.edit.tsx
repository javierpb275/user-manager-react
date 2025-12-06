import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLocalUsersStore } from "../../stores/users-local.store";
import { fetchCombinedUser } from "../../services/user.service";
import { useQueryClient } from "@tanstack/react-query";
import UserEditForm from "../../components/user-edit-form.component";

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

  return (
    <div className="px-4 pb-10">
      <UserEditForm form={form} setForm={setForm} onSubmit={handleSubmit} />
    </div>
  );
}
