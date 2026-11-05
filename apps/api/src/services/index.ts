import { authentication } from "./authentication/authentication";
import { user } from "./user/user";
import { asset } from "./asset/asset";
import { audit } from "./audit/audit";
import { lookups } from "./lookup/lookups";
import { game } from "./game/game";
import { collectionItem } from "./collection-item/collection-item";
import { library } from "./library/library";
import { catalogSearch } from "./catalog-search/catalog-search";

import type { Application } from "../declarations";

export const services = (app: Application) => {
  app.configure(authentication);
  app.configure(user);
  app.configure(asset);
  app.configure(audit);
  // Reference data, then the catalog, then the per-user collection on top of it.
  app.configure(lookups);
  app.configure(game);
  app.configure(collectionItem);
  app.configure(library);
  app.configure(catalogSearch);
};
