import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { ApiServicePath } from "@game-library/types";
import { app } from "../src/app";

const port = app.get("port");
const baseUrl = `http://localhost:${port}`;
const indexHtml = path.resolve(app.get("public"), "index.html");

const TEST_USER = { email: `test-${Date.now()}@game-library.dev`, password: "development", name: "Test User" };

describe("Game Library API", () => {
  beforeAll(async () => {
    await app.listen(port);
  });

  afterAll(async () => {
    await app.get("postgresqlClient")("users").where({ email: TEST_USER.email }).delete();
    await app.teardown();
    await app.get("postgresqlClient").destroy();
  });

  it("returns a JSON 404 for unknown API paths", async () => {
    const res = await fetch(`${baseUrl}/nope`, { headers: { accept: "application/json" } });
    expect(res.status).toBe(404);
    const body = (await res.json()) as { name: string };
    expect(body.name).toBe("NotFound");
  });

  it("rejects unauthenticated access to users", async () => {
    const res = await fetch(`${baseUrl}/${ApiServicePath.Users}`, { headers: { accept: "application/json" } });
    expect(res.status).toBe(401);
  });

  it("registers a user and authenticates with the local strategy", async () => {
    // Internal call: the external resolver doesn't run, so the (hashed) password is visible here.
    const created = await app.service(ApiServicePath.Users).create(TEST_USER, {});
    expect(created.email).toBe(TEST_USER.email);
    expect((created as { password?: string }).password).not.toBe(TEST_USER.password);

    const res = await fetch(`${baseUrl}/authentication`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ strategy: "local", email: TEST_USER.email, password: TEST_USER.password })
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { accessToken: string; user: { email: string; isSuperAdmin: boolean } };
    expect(body.accessToken).toBeTypeOf("string");
    expect(body.user.email).toBe(TEST_USER.email);
    // External responses never carry the password hash.
    expect((body.user as { password?: string }).password).toBeUndefined();

    // A regular user cannot list accounts (super-admin only).
    const list = await fetch(`${baseUrl}/${ApiServicePath.Users}`, {
      headers: { accept: "application/json", authorization: `Bearer ${body.accessToken}` }
    });
    expect(list.status).toBe(403);
  });

  it.skipIf(!existsSync(indexHtml))("serves the SPA index for HTML navigations", async () => {
    const res = await fetch(`${baseUrl}/profile`, { headers: { accept: "text/html" } });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
    expect(await res.text()).toContain('<div id="root">');
  });
});
