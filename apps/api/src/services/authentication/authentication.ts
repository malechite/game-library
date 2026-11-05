import { AuthenticationService, JWTStrategy } from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import type { Application } from "../../declarations";

export const authentication = (app: Application) => {
  const auth = new AuthenticationService(app);

  auth.register("jwt", new JWTStrategy());
  auth.register("local", new LocalStrategy());

  app.use("authentication", auth);
};

declare module "../../declarations" {
  interface ServiceTypes {
    authentication: AuthenticationService;
  }
}
