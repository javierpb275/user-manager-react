import { useState } from "react";

type RegisterFormProps = {
  onSubmit: (form: { username: string; email: string; password: string }) => void;
  error?: string;
};

export const RegisterForm = ({ onSubmit, error }: RegisterFormProps) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl space-y-6 rounded-xl border border-gray-300 bg-gray-100 p-10 dark:border-gray-600 dark:bg-gray-800 shadow-lg"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Your username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          className="mt-2 w-full rounded-lg border-gray-300 px-4 py-4 text-lg focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="mt-2 w-full rounded-lg border-gray-300 px-4 py-4 text-lg focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="mt-2 w-full rounded-lg border-gray-300 px-4 py-4 text-lg focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-lg border border-indigo-600 bg-indigo-600 px-6 py-4 text-lg font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600 dark:hover:bg-indigo-700 dark:hover:text-white"
      >
        Register
      </button>
    </form>
  );
};
