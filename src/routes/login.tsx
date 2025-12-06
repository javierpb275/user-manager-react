import {
  createFileRoute,
  redirect,
  useNavigate,
  Link,
} from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";
import { useLocalUsersStore } from "../stores/users-local.store";
import { useState } from "react";
import { LoginForm } from "../components/login-form.component";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const { user } = useAuthUserStore.getState();
    if (user) {
      throw redirect({ to: "/users" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const loginStore = useAuthUserStore((s) => s.loginStore);
  const localUsers = useLocalUsersStore((s) => s.users);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

      <LoginForm
        onSubmit={(email) => {
          const found = localUsers.find((u) => u.email === email);
          if (!found) {
            setError("User not found");
            return;
          }
          loginStore(found);
          navigate({ to: "/users" });
        }}
        error={error}
      />

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 font-medium">
          Register
        </Link>
      </p>

      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
    </div>
  );
}

