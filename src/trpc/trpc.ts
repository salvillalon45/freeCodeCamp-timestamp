import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { dateRouter } from '../routers/date/dateRouter';

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

/*
    To merge route. Now when I try to access the date router, 
    I just follow the path 
    http://localhost:3000/api/date?input=%22salvador%20villalon%22
*/
export const mergeRouters = t.mergeRouters;
