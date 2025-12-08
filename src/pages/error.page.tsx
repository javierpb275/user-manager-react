export default function ErrorPage({
  code = "Error",
  message = "Something went wrong.",
}: {
  code?: string | number;
  message?: string;
}) {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="px-4 mx-auto max-w-7xl text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600 dark:text-red-500">
          {code}
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          {message}
        </p>
        <p className="mb-6 text-lg font-light text-gray-500 dark:text-gray-400">
          Try reloading the page or coming back later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none 
          focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
          dark:focus:ring-red-900"
        >
          Reload Page
        </button>
      </div>
    </section>
  );
}
