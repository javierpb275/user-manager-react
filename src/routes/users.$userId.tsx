import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCombinedUser } from "../services/user.service";

export const Route = createFileRoute("/users/$userId")({
  component: UserPage,
});

function UserPage() {
  const { userId } = Route.useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchCombinedUser(Number(userId)),
  });

  if (isLoading) return <p>Loading user...</p>;
  if (isError) return <p>Failed to load user.</p>;

  const user = data.data;

  return (
    <div style={{ padding: 20 }}>
      <h1>User Detail</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <img src={user.avatar} width={100} height={100} style={{ borderRadius: "50%" }} />

      <br />
      <Link to="/users/$userId/edit" params={{ userId: String(user.id) }}>
        <button>Edit User</button>
      </Link>
    </div>
  );
}
