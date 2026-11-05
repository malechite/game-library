import type { UserService } from "./user.class";

export type { User, UserData, UserPatch, UserQuery } from "./user.class";

export const userMethods: Array<keyof UserService> = ["find", "get", "create", "patch", "remove"];
