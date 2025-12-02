import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
  // In a loader
  //loader: ({ params }) => fetchUser(params.userId),
  // Or in a component
  component: UserPage,
});

function UserPage() {
  // In a component!
  const { userId } = Route.useParams()
  return <div>User ID: {userId}</div>
}
