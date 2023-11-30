import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

// Created for each request
export const createContext = ({
	req,
	res
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

/*
    Initialize tRPC api
*/
const t = initTRPC.context<Context>().create();

/*
    Router
    This is how you create new routers and sub-routers in your tRPC API
*/
export const createTRPCRouter = t.router;

/*
    Public procedure
    Use to build new queries and mutations on your tRPC API. 
*/
export const publicProcedure = t.procedure;
