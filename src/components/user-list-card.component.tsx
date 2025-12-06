import { Link } from "@tanstack/react-router";
import type { TUser } from "../types/user.types";

type Props = {
  user: TUser;
};

export default function UserListCard({ user }: Props) {
  return (
    <article className="rounded-xl border border-gray-700 bg-gray-800 p-4 hover:border-teal-500 transition">
      <div className="flex items-center gap-4">
        <img
          alt={`${user.first_name} ${user.last_name}`}
          src={user.avatar || "/profile-avatar.png"}
          className="size-16 rounded-full object-cover border border-gray-600"
        />

        <div>
          <h3 className="text-lg font-medium text-white">
            {user.first_name} {user.last_name}
          </h3>

          {/* EMAIL + ID */}
          <div className="flow-root">
            <ul className="-m-1 flex flex-wrap">
              <li className="p-1 leading-none">
                <span className="text-xs font-medium text-gray-300">
                  {user.email}
                </span>
              </li>

              <li className="p-1 leading-none">
                <span className="text-xs font-medium text-gray-300">
                  ID: {user.id}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* DETAILS BUTTON */}
      <ul className="mt-4 space-y-2">
        <li>
          <Link
            to="/users/$userId"
            params={{ userId: String(user.id) }}
            className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600 transition"
          >
            <strong className="font-medium text-white">
              View Details
            </strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Click to view full profile and edit user information.
            </p>
          </Link>
        </li>
      </ul>
    </article>
  );
}
