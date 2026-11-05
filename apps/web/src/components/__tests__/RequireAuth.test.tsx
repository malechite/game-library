import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { RequireAuth } from "../RequireAuth";

const useCurrentUser = vi.fn();

vi.mock("@game-library/sdk", () => ({
  useCurrentUser: () => useCurrentUser()
}));

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/login" element={<div>login page</div>} />
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<div>profile page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe("RequireAuth", () => {
  beforeEach(() => useCurrentUser.mockReset());

  it("shows the loader while the session is being checked", () => {
    useCurrentUser.mockReturnValue({ data: undefined, isPending: true });
    renderAt("/profile");
    expect(screen.getByRole("status")).toHaveTextContent("Checking session");
  });

  it("redirects anonymous visitors to the login page", () => {
    useCurrentUser.mockReturnValue({ data: null, isPending: false });
    renderAt("/profile");
    expect(screen.getByText("login page")).toBeInTheDocument();
  });

  it("renders the protected route for a signed-in user", () => {
    useCurrentUser.mockReturnValue({ data: { id: "u1", name: "Ada" }, isPending: false });
    renderAt("/profile");
    expect(screen.getByText("profile page")).toBeInTheDocument();
  });
});
