import type { Params } from "@feathersjs/feathers";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";

import type { Application } from "../../declarations";
import type { User, UserData, UserPatch, UserQuery } from "./user.schema";

export type { User, UserData, UserPatch, UserQuery };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserParams extends KnexAdapterParams<UserQuery> {}

export class UserService<ServiceParams extends Params = UserParams> extends KnexService<
  User,
  UserData,
  ServiceParams,
  UserPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => ({
  paginate: app.get("paginate"),
  Model: app.get("postgresqlClient"),
  name: "users"
});
