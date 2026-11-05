import type { Paginated, Params } from "@feathersjs/feathers";
import type { ApiUser } from "@game-library/types";

export interface UserData {
  email: string;
  password: string;
  name: string;
}

export interface UserPatch {
  email?: string;
  password?: string;
  name?: string;
}

export interface UserQuery {
  id?: string;
  email?: string;
  name?: string;
  $limit?: number;
  $skip?: number;
  $sort?: Record<string, 1 | -1>;
}

export interface UserService {
  find(params?: Params<UserQuery>): Promise<Paginated<ApiUser>>;
  get(id: string, params?: Params<UserQuery>): Promise<ApiUser>;
  create(data: UserData, params?: Params<UserQuery>): Promise<ApiUser>;
  patch(id: string, data: UserPatch, params?: Params<UserQuery>): Promise<ApiUser>;
  remove(id: string, params?: Params<UserQuery>): Promise<ApiUser>;
}

export const userMethods = ["find", "get", "create", "patch", "remove"] as const;
