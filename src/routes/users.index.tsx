import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
});

function UsersPage() {
  return <h1>RENDER LIST OF USERS</h1>;
}