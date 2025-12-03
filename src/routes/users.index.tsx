// src/routes/users.index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/user.service";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
});

function UsersPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", 1, 10],
    queryFn: () => fetchUsers(1, 10),
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users List</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {data ? (
          data.data.map((user) => (
            <li
              key={user.id}
              style={{
                padding: "12px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />

              {/* 👇 TanStack Link to user page */}
              <Link
                to="/users/$userId"
                params={{ userId: String(user.id) }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div>
                  <strong>
                    {user.first_name} {user.last_name}
                  </strong>
                  <br />
                  <small>{user.email}</small>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <h1>ERROR GETTING USERS</h1>
        )}
      </ul>
    </div>
  );
}
