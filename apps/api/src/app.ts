import { feathers } from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from "@feathersjs/koa";
import socketio from "@feathersjs/socketio";

import { configurationValidator } from "./configuration";
import { covers } from "./covers/cover-service";
import type { Application } from "./declarations";
import { auditLog } from "./hooks/audit-log";
import { logError } from "./hooks/log-error";
import { postgresql } from "./postgresql";
import { routes } from "./routes";
import { s3 } from "./s3";
import { spaFallback } from "./spa";
import { services } from "./services";
import { channels } from "./channels";

const app: Application = koa(feathers());

app.configure(configuration(configurationValidator));

app.use(
  cors({
    origin: (ctx: { request: { header: { origin?: string } } }) => {
      const allowedOrigins: string[] = app.get("origins" as never) || [];
      const requestOrigin = ctx.request.header.origin;
      if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
        return requestOrigin;
      }
      return "";
    },
    credentials: true
  })
);
// The built web SPA (apps/web/dist) is served from `public`: hashed assets are
// static files, everything else falls through to the SPA fallback below.
app.use(serveStatic(app.get("public")));
app.use(errorHandler());
app.use(parseAuthentication());
app.use(bodyParser({ jsonLimit: "25mb" }));

// Custom HTTP routes (upload, import, summary, …) that map to custom service
// methods. Must be registered BEFORE rest() — see src/routes.ts.
app.configure(routes);

app.configure(postgresql);
app.configure(s3);
app.configure(covers);
app.configure(rest());
// After rest(): only requests no service matched reach the SPA fallback.
app.use(spaFallback(app));
app.configure(
  socketio({
    cors: { origin: app.get("origins" as never) }
  })
);
app.configure(services);
app.configure(channels);

app.hooks({
  around: { all: [logError, auditLog] },
  before: {},
  after: {},
  error: {}
});

app.hooks({
  setup: [],
  teardown: []
});

export { app };
