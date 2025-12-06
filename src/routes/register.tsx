import {
  createFileRoute,
  redirect,
  useNavigate,
  Link,
} from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";
import { useLocalUsersStore } from "../stores/users-local.store";
import { useState } from "react";
import { RegisterForm } from "../components/register-form.component";

export const Route = createFileRoute("/register")({
  beforeLoad: () => {
    const { user } = useAuthUserStore.getState();
    if (user) {
      throw redirect({ to: "/users" });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  const loginStore = useAuthUserStore((s) => s.loginStore);
  const addUser = useLocalUsersStore((s) => s.addUser);
  const users = useLocalUsersStore((s) => s.users);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

      <RegisterForm
        error={error}
        onSubmit={(formData) => {
          if (users.some((u) => u.email === formData.email)) {
            setError("Email already registered");
            return;
          }

          const newUser = {
            id: Date.now(),
            email: formData.email,
            first_name: formData.username,
            last_name: "",
            avatar: "/profile-avatar.png",
          };

          addUser(newUser);
          loginStore(newUser);
          navigate({ to: "/users" });
        }}
      />

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-medium">
          Login
        </Link>
      </p>

      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
    </div>
  );
}

