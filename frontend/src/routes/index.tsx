import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    const navigate = useNavigate();
    navigate({ to: "/dashboard" });
  },
});
