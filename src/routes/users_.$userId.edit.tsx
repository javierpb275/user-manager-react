import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users_/$userId/edit")({
  // In a loader
  //loader: ({ params }) => fetchUser(params.userId),
  // Or in a component
  component: UserEditPage,
});

function UserEditPage() {
  // In a component!
  const { userId } = Route.useParams()
  return <div>Edit User ID: {userId}</div>
}
