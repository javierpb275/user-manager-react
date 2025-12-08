import { createFileRoute } from "@tanstack/react-router";
import { RequireAuth } from "../../components/wrappers/requires-auth.component";
import UserEditForm from "../../components/user-edit-form.component";
import { useUserEditPage } from "../../hooks/user-edit-page.hook";

export const Route = createFileRoute("/__authenticated/users_/$userId/edit")({
  component: UserEditPage,
});

function UserEditPage() {
  const { userId } = Route.useParams();
  const { form, setForm, handleSubmit } = useUserEditPage(userId);

  return (
    <div className="px-4 pb-10">
      <RequireAuth>
        <UserEditForm form={form} setForm={setForm} onSubmit={handleSubmit} />
      </RequireAuth>
    </div>
  );
}
