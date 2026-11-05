import { ApiServicePath } from "@game-library/types";
import { app } from "../src/app";

export { app };

const port = app.get("port");
export const baseUrl = `http://localhost:${port}`;

/** Start the HTTP server for a test file. */
export const startApp = async (): Promise<void> => {
  await app.listen(port);
};

/** Stop the server and release the database pool so the test process can exit. */
export const stopApp = async (): Promise<void> => {
  await app.teardown();
  await app.get("postgresqlClient").destroy();
};

export interface TestUser {
  id: string;
  email: string;
  token: string;
}

/** Register a throwaway user and sign in, returning their id and JWT. */
export const createTestUser = async (label: string): Promise<TestUser> => {
  const email = `${label}-${Date.now()}-${Math.round(Math.random() * 1e6)}@game-library.dev`;
  const user = await app.service(ApiServicePath.Users).create({ email, password: "development", name: label }, {});

  const res = await fetch(`${baseUrl}/authentication`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ strategy: "local", email, password: "development" })
  });
  const { accessToken } = (await res.json()) as { accessToken: string };
  return { id: user.id, email, token: accessToken };
};

/** Delete test users (their collection items go with them). */
export const removeTestUsers = async (users: TestUser[]): Promise<void> => {
  await app
    .get("postgresqlClient")("users")
    .whereIn(
      "id",
      users.map((user) => user.id)
    )
    .delete();
};

export interface ApiResponse<T> {
  status: number;
  body: T;
}

/** An HTTP client bound to one user's token. */
export const apiFor =
  (user: TestUser) =>
  async <T = any>(path: string, init: { method?: string; body?: unknown } = {}): Promise<ApiResponse<T>> => {
    const res = await fetch(`${baseUrl}${path}`, {
      method: init.method ?? "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${user.token}`,
        ...(init.body !== undefined ? { "content-type": "application/json" } : {})
      },
      ...(init.body !== undefined ? { body: JSON.stringify(init.body) } : {})
    });
    return { status: res.status, body: (await res.json().catch(() => null)) as T };
  };
