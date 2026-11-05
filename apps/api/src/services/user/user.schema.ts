import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";
import { passwordHash } from "@feathersjs/authentication-local";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { UserService } from "./user.class";

// ─── Main schema ──────────────────────────────────────────────────────────
// The full user record as stored / returned. `password` is included for
// validation/hashing but stripped from external responses (see userExternalResolver).
export const userSchema = Type.Object(
  {
    id: Type.String({ format: "uuid" }),
    email: Type.String({ format: "email" }),
    password: Type.Optional(Type.String()),
    name: Type.String(),
    isSuperAdmin: Type.Optional(Type.Boolean()),
    createdAt: Type.String(),
    updatedAt: Type.String()
  },
  { $id: "User", additionalProperties: false }
);
export type User = Static<typeof userSchema>;
export const userValidator = getValidator(userSchema, dataValidator);
export const userResolver = resolve<User, HookContext<UserService>>({});

export const userExternalResolver = resolve<User, HookContext<UserService>>({
  password: async () => undefined
});

// ─── Create ───────────────────────────────────────────────────────────────
export const userDataSchema = Type.Pick(userSchema, ["email", "password", "name"], {
  $id: "UserData"
});
export type UserData = Static<typeof userDataSchema> & { password: string };
export const userDataValidator = getValidator(userDataSchema, dataValidator);
export const userDataResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: "local" })
});

// ─── Patch ────────────────────────────────────────────────────────────────
// Only the self-editable fields are patchable. `isSuperAdmin` is deliberately
// excluded so it can't be granted over the API (additionalProperties: false
// rejects it) — privilege is set out-of-band (migration/seed).
export const userPatchSchema = Type.Partial(Type.Pick(userSchema, ["email", "password", "name"]), {
  $id: "UserPatch"
});
export type UserPatch = Static<typeof userPatchSchema>;
export const userPatchValidator = getValidator(userPatchSchema, dataValidator);
export const userPatchResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: "local" })
});

// ─── Query ────────────────────────────────────────────────────────────────
export const userQueryProperties = Type.Pick(userSchema, ["id", "email", "name", "createdAt", "updatedAt"]);
export const userQuerySchema = Type.Intersect(
  [querySyntax(userQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
);
export type UserQuery = Static<typeof userQuerySchema>;
export const userQueryValidator = getValidator(userQuerySchema, queryValidator);
export const userQueryResolver = resolve<UserQuery, HookContext<UserService>>({});
