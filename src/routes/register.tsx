import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";
import { RegisterForm } from "../components/register-form.component";
import { useRegisterPage } from "../hooks/register-page.hook";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    const { user } = useAuthUserStore.getState();
    if (user) throw redirect({ to: "/users" });
  },
  component: RegisterPage,
});
function RegisterPage() {
  const { error, handleRegister } = useRegisterPage();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
      <RegisterForm error={error} onSubmit={handleRegister} />
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-medium">
          Login
        </Link>
      </p>
    </div>
  );
}
