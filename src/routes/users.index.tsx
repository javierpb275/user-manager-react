import { createFileRoute, Link } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCombinedUsers } from "../services/user.service";
import { useEffect, useRef } from "react";
import type { TUser } from "../types/user.types";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
});

function UsersPage() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchCombinedUsers(pageParam, 10),

    getNextPageParam: (lastPage) => {
      if (!lastPage.page) return undefined;
      return lastPage.page + 1;
    },
  });

  // infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  const usersMap = new Map<number, TUser>();

  data?.pages.forEach((page) => {
    page.data.forEach((u) => {
      if (!usersMap.has(u.id)) {
        usersMap.set(u.id, u);
      }
    });
  });

  const allUsers = Array.from(usersMap.values());

  return (
    <div style={{ padding: 20 }}>
      <h1>Users List</h1>

      <Link to="/login" style={{ marginRight: 10 }}>
        Login
      </Link>
      <Link to="/register">Register</Link>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {allUsers.map((user) => (
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
                <strong>
                  {user.first_name} {user.last_name}
                </strong>
                <br />
                <small>{user.email}</small>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* infinite scroll loader */}
      <div ref={loadMoreRef} style={{ height: 40 }} />

      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
}
