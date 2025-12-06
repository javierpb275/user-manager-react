import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { TUser } from "../types/user.types";

type NavbarProps = {
  user: TUser | null;
  logout: () => void;
};

export default function Navbar({ user, logout }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT — Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="block text-teal-600 dark:text-teal-600">
              <span className="sr-only">Home</span>
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.41 10.3847C1.14777 7.4194 ..." fill="currentColor" />
              </svg>
            </Link>
          </div>

          {/* CENTER NAVIGATION — Desktop */}
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    to="/users"
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  >
                    Users
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {!user && (
              <div className="hidden sm:flex sm:gap-4">
                <Link
                  to="/login"
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                >
                  Register
                </Link>
              </div>
            )}

            {user && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setOpen(!open)}
                  className="overflow-hidden rounded-full border border-gray-300 dark:border-gray-700 shadow-inner"
                >
                  <img
                    src={user.avatar || "/profile-avatar.png"}
                    className="w-10 h-10 object-cover"
                    alt={user.first_name}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg divide-y divide-gray-100 dark:divide-gray-700 z-50">
                    <div className="p-2">
                      <p className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                        {user.first_name} {user.last_name}
                        <br />
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {user.email}
                        </span>
                      </p>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <div className="block md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            <Link
              to="/users"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Users
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
