import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Hello,
});

function Hello() {
  return <h1>Hello, Home Page!</h1>;
}