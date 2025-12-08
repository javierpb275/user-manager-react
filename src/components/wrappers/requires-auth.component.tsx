import { useEffect, type JSX } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthUserStore } from "../../stores/auth-user.store";
import { Spinner } from "../loaders/spinner.component";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAuthUserStore((s) => s.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);
  if (!user) return <Spinner />;
  return children;
}
