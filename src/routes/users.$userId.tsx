import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCombinedUser } from "../services/user.service";
import UserDetailsCard from "../components/user-details-card.component";
import { Spinner } from "../components/loaders/spinner.component";

export const Route = createFileRoute("/users/$userId")({
  component: UserPage,
});

function UserPage() {
  const { userId } = Route.useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchCombinedUser(Number(userId)),
  });

  if (isLoading) return <Spinner/>;
  if (isError) return <p>Failed to load user.</p>;

  const user = data!.data;

  return (
  <div className="px-4 pb-10">
    <UserDetailsCard user={user} />
  </div>
  );
}
