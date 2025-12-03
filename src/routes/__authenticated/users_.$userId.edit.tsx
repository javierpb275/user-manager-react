import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthUserStore } from "../../stores/auth-user.store";

export const Route = createFileRoute("/__authenticated/users_/$userId/edit")({
  component: UserEditPage,
});

function UserEditPage() {
  const { userId } = Route.useParams();
  const authUser = useAuthUserStore((s) => s.user);
  const logoutStore = useAuthUserStore((s) => s.logoutStore);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutStore();
    navigate({ to: "/users" });
  };

  if (!authUser) return null;

  return (
    <div>
      <h1>Edit User ID: {userId}</h1>
      <p>Hello {authUser.first_name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
