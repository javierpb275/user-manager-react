import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCombinedUsers } from "../services/user.service";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
});

function UsersPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", 1, 10],
    queryFn: () => fetchCombinedUsers(1, 10),
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Users List</h1>

      <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
      <Link to="/register">Register</Link>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {data?.data.map((user) => (
          <li
            key={user.id}
            style={{
              padding: 12,
              marginBottom: 10,
              border: "1px solid #ccc",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />

            <Link
              to="/users/$userId"
              params={{ userId: String(user.id) }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div>
                <strong>{user.first_name} {user.last_name}</strong>
                <br />
                <small>{user.email}</small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
