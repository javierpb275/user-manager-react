import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";
import { LoginForm } from "../components/login-form.component";
import { useLoginPage } from "../hooks/login-page.hook";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const { user } = useAuthUserStore.getState();
    if (user) throw redirect({ to: "/users" });
  },
  component: LoginPage,
});
function LoginPage() {
  const { error, handleLogin } = useLoginPage();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
      <LoginForm onSubmit={handleLogin} error={error} />
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}
