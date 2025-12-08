import { Link } from "@tanstack/react-router";
import type { TUser } from "../types/user.types";

type Props = {
  user: TUser;
};

export default function UserDetailsCard({ user }: Props) {
  return (
    <article className="rounded-xl border border-gray-700 bg-gray-800 p-6 max-w-xl mx-auto mt-24">
      <div className="flex items-center gap-6">
        <img
          alt={`${user.first_name} ${user.last_name}`}
          src={user.avatar || "/profile-avatar.png"}
          className="size-24 rounded-full object-cover border border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-300 text-sm">{user.email}</p>
          <p className="text-gray-400 text-xs mt-1">User ID: {user.id}</p>
        </div>
      </div>
      <div className="h-px bg-gray-700 my-6"></div>
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-white">About</h3>
        <p className="text-sm text-gray-300">
          This user is part of the User Manager system. You can edit their
          information or manage their account using the button below.
        </p>
      </div>
      <div className="mt-6">
        <Link
          to="/users/$userId/edit"
          params={{ userId: String(user.id) }}
          className="
            inline-block
            w-full
            text-center
            rounded-lg
            bg-primary
            px-4
            py-2
            font-medium
            text-white
            hover:bg-primary/90
            transition
          "
        >
          Edit User
        </Link>
      </div>
    </article>
  );
}
