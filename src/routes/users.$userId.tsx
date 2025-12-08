import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCombinedUser } from "../services/user.service";
import UserDetailsCard from "../components/user-details-card.component";
import { Spinner } from "../components/loaders/spinner.component";
import Page404 from "../pages/404.page";
import ErrorPage from "../pages/error.page";

export const Route = createFileRoute("/users/$userId")({
  component: UserPage,
});

function UserPage() {
  const { userId } = Route.useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchCombinedUser(Number(userId)),
    retry: false,
  });
  if (isLoading) return <Spinner />;
  if (isError) {
    return <ErrorPage code={500} message="Could not fetch user data." />;
  }
  if (!data?.data) {
    return <Page404 />;
  }
  return (
    <div className="px-4 pb-10">
      <UserDetailsCard user={data.data} />
    </div>
  );
}
