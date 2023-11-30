import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';
import { dateRouter } from './routers/date/dateRouter';
import { z } from 'zod';
import { appRouter } from './routers';
import { createTRPCRouter, publicProcedure } from './trpc/trpc';
// import { createContext } from './trpc/trpc';

// created for each request
const createContext = ({
	req,
	res
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
// const appRouter = t.router({
// 	getUser: t.procedure.input(z.string()).query((opts) => {
// 		opts.input; // string
// 		return { id: opts.input, name: 'Bilbo' };
// 	})
//});
// const appRouter = createTRPCRouter({
// 	date: publicProcedure.input(z.string()).query((opts) => {
// 		opts.input; // string
// 		return { id: opts.input, name: 'Bilbo' };
// 	})
// });

const app = express();
const port = 3000;

app.use(
	'/api',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext
	})
);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
