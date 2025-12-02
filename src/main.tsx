import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen"; // auto-generated
import "./index.css"; // optional, your global styles

// 1️⃣ Create React Query client
const queryClient = new QueryClient();

// 2️⃣ Create router with context
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
});

// 3️⃣ Augment TanStack Router types
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// 4️⃣ Render app
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
