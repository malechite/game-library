import type { HookContext as FeathersHookContext, NextFunction } from "@feathersjs/feathers";
import type { Application as FeathersApplication } from "@feathersjs/koa";
import type { ApplicationConfiguration } from "./configuration";

export type { NextFunction };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Configuration extends ApplicationConfiguration {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceTypes {}

export type Application = FeathersApplication<ServiceTypes, Configuration>;

export type HookContext<S = unknown> = FeathersHookContext<Application, S>;
