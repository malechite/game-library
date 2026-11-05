import { feathers } from "@feathersjs/feathers";
import type { TransportConnection, Application } from "@feathersjs/feathers";
import authenticationClient from "@feathersjs/authentication-client";
import type { AuthenticationClientOptions } from "@feathersjs/authentication-client";
import { ApiServicePath, type ApiLookupPath } from "@game-library/types";

import {
  userMethods,
  assetMethods,
  auditMethods,
  lookupMethods,
  gameMethods,
  collectionItemMethods,
  libraryMethods,
  catalogSearchMethods,
  type UserService,
  type AssetService,
  type AuditService,
  type LookupService,
  type GameService,
  type CollectionItemService,
  type LibraryService,
  type CatalogSearchService
} from "./services";

/** Every service the API exposes, keyed by its path. Mirrors the server's `ServiceTypes`. */
export interface ServiceTypes {
  [ApiServicePath.Users]: UserService;
  [ApiServicePath.Assets]: AssetService;
  [ApiServicePath.Audit]: AuditService;
  [ApiServicePath.Platforms]: LookupService;
  [ApiServicePath.Categories]: LookupService;
  [ApiServicePath.Countries]: LookupService;
  [ApiServicePath.ReleaseTypes]: LookupService;
  [ApiServicePath.Ownerships]: LookupService;
  [ApiServicePath.Genres]: LookupService;
  [ApiServicePath.Companies]: LookupService;
  [ApiServicePath.Games]: GameService;
  [ApiServicePath.CollectionItems]: CollectionItemService;
  [ApiServicePath.Library]: LibraryService;
  [ApiServicePath.CatalogSearch]: CatalogSearchService;
}

export interface Configuration {
  connection: TransportConnection<ServiceTypes>;
}

export type ClientApplication = Application<ServiceTypes, Configuration>;

/** The lookup tables, each exposed as its own service path with the same shape. */
export const LOOKUP_PATHS: ApiLookupPath[] = [
  ApiServicePath.Platforms,
  ApiServicePath.Categories,
  ApiServicePath.Countries,
  ApiServicePath.ReleaseTypes,
  ApiServicePath.Ownerships,
  ApiServicePath.Genres,
  ApiServicePath.Companies
];

/**
 * Create a typed Feathers client for the Game Library API.
 *
 * @example
 * const client = createClient(rest("http://localhost:3030").fetch(window.fetch));
 * await client.authenticate({ strategy: "local", email, password });
 * const page = await client.service(ApiServicePath.Library).find({ query: { $limit: 24 } });
 */
export const createClient = (
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
): ClientApplication => {
  const client: ClientApplication = feathers();

  client.configure(connection);
  client.configure(authenticationClient(authenticationOptions));
  client.set("connection", connection);

  client.use(ApiServicePath.Users, connection.service(ApiServicePath.Users), { methods: [...userMethods] });
  client.use(ApiServicePath.Assets, connection.service(ApiServicePath.Assets), { methods: [...assetMethods] });
  client.use(ApiServicePath.Audit, connection.service(ApiServicePath.Audit), { methods: [...auditMethods] });

  for (const path of LOOKUP_PATHS) {
    // All lookup paths share one service shape; narrow the union so `use` picks a single overload.
    const lookupPath = path as ApiServicePath.Platforms;
    client.use(lookupPath, connection.service(lookupPath), { methods: [...lookupMethods] });
  }

  client.use(ApiServicePath.Games, connection.service(ApiServicePath.Games), { methods: [...gameMethods] });
  client.use(ApiServicePath.CollectionItems, connection.service(ApiServicePath.CollectionItems), {
    methods: [...collectionItemMethods]
  });
  client.use(ApiServicePath.Library, connection.service(ApiServicePath.Library), { methods: [...libraryMethods] });
  client.use(ApiServicePath.CatalogSearch, connection.service(ApiServicePath.CatalogSearch), {
    methods: [...catalogSearchMethods]
  });

  return client;
};

export type GameLibraryApiClient = ClientApplication;

// Re-export the service data/query types for consumers (e.g. building forms).
export * from "./services";
