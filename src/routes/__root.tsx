import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { QueryClient } from '@tanstack/react-query'

// 1️⃣ Define what your router context will contain
export interface MyRouterContext {
  queryClient: QueryClient
}

// 2️⃣ Create the root route with context support
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <div>
        <header>
          <Link to="/users">USERS</Link>{' '}
          <Link to="/login">LOGIN</Link>
        </header>

        <main>
          <Outlet /> {/* Child routes render here */}
        </main>

        <TanStackRouterDevtools />
      </div>
    )
  },

  notFoundComponent: () => <h1>404 — Not Found</h1>,
})
