import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// Root route must export `Route`
export const Route = createRootRoute({
  component: () => {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>{' '}
          <Link to="/about">About</Link>
        </header>

        <main>
          <Outlet /> {/* child routes render here */}
        </main>

        <TanStackRouterDevtools />
      </div>
    )
  },
  notFoundComponent: () => <h1>404 — Not Found</h1>,
})