type Props = {
  form: {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      email: string;
      avatar: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
};

export default function UserEditForm({ form, setForm, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="
        mx-auto mt-24 max-w-md space-y-4 
        rounded-lg border border-gray-600 
        bg-gray-800 p-6
      "
    >
      <div className="flex justify-center">
        <img
          src={form.avatar || "/profile-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border border-gray-500"
        />
      </div>
      <input
        type="text"
        value={form.avatar}
        onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
        className="hidden"
      />
      <div>
        <label
          className="block text-sm font-medium text-white"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={form.first_name}
          onChange={(e) =>
            setForm((f) => ({ ...f, first_name: e.target.value }))
          }
          required
          className="
            mt-1 w-full rounded-lg border-gray-600 
            bg-gray-900 text-white 
            focus:border-indigo-500 focus:outline-none
          "
          placeholder="First name"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-white"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={form.last_name}
          onChange={(e) =>
            setForm((f) => ({ ...f, last_name: e.target.value }))
          }
          required
          className="
            mt-1 w-full rounded-lg border-gray-600 
            bg-gray-900 text-white 
            focus:border-indigo-500 focus:outline-none
          "
          placeholder="Last name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
          className="
            mt-1 w-full rounded-lg border-gray-600 
            bg-gray-900 text-white 
            focus:border-indigo-500 focus:outline-none
          "
          placeholder="Email address"
        />
      </div>
      <button
        type="submit"
        className="
          block w-full rounded-lg border border-indigo-600 
          bg-indigo-600 px-12 py-3 text-sm font-medium text-white 
          transition-colors hover:bg-transparent hover:text-indigo-600
          dark:hover:bg-indigo-700 dark:hover:text-white
        "
      >
        Save Changes
      </button>
    </form>
  );
}
