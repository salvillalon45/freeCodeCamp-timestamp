import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc/trpc';
import { dateRouter } from './date/dateRouter';

export const appRouter = createTRPCRouter({
	// date: dateRouter
	date: publicProcedure.input(z.string()).query((opts) => {
		opts.input; // string
		return { id: opts.input, name: 'Bilbo' };
	})
});

export type AppRouter = typeof appRouter;
