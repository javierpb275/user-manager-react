import { createFileRoute } from "@tanstack/react-router";
import CardList from "../components/card-list.component";
import { useUsersPage } from "../hooks/users-page.hook";
import { Spinner } from "../components/loaders/spinner.component";
import ErrorPage from "../pages/error.page";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
});

function UsersPage() {
  const { users, loadMoreRef, isLoading, isError, isFetchingNextPage } =
    useUsersPage();
  if (isLoading) return <Spinner />;
  if (isError) return <ErrorPage code={500} message="Failed to load user." />;
  return (
    <div style={{ padding: 20 }}>
      <CardList users={users} />
      <div ref={loadMoreRef} style={{ height: 40 }} />
      {isFetchingNextPage && <Spinner />}
    </div>
  );
}
