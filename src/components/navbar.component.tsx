import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { TUser } from "../types/user.types";

type NavbarProps = {
  user: TUser | null;
  logout: () => void;
};

export default function Navbar({ user, logout }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#1a1a1a] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-0 mt-8">
          {/* Left - App Name */}
          <div className="shrink-0">
            <Link
              to="/"
              className="text-lg font-semibold hover:text-blue-400"
            >
              User Manager
            </Link>
          </div>

          {/* Center - Navigation */}
          <div className="flex space-x-4">
            <Link
              to="/users"
              className="px-3 py-1 text-sm font-medium rounded hover:bg-gray-700 hover:text-white"
            >
              Users
            </Link>
          </div>

          {/* Right - User Avatar / Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={user?.avatar || "/profile-avatar.png"}
                alt={user?.first_name || "Guest"}
                className="w-8 h-8 rounded-full border border-gray-500"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 text-sm">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-700">
                      <span className="block font-medium">{user.first_name}</span>
                      <span className="block text-gray-400 truncate text-xs">{user.email}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-green-600 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to push content below navbar */}
      <div className="h-14" />
    </nav>
  );
}
