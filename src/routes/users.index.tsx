import { createFileRoute } from "@tanstack/react-router";
import CardList from "../components/card-list.component";
import { useUsersPage } from "../hooks/users-page.hook";
import { Spinner } from "../components/loaders/spinner.component";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
});

function UsersPage() {
  const {
    users,
    loadMoreRef,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useUsersPage();

  if (isLoading) return <Spinner/>;
  if (isError) return <p>Failed to load users.</p>;

  return (
    <div style={{ padding: 20 }}>
      <CardList users={users} />
      <div ref={loadMoreRef} style={{ height: 40 }} />
      {isFetchingNextPage && <Spinner/>}
    </div>
  );
}
