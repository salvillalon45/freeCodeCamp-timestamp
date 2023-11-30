import { createTRPCRouter, publicProcedure } from '../../trpc/trpc';
import { dateSchema } from '../../schema/date/date.schema';
import dateRouterHandler from './dateRouterHandler';
import { z } from 'zod';

export const dateRouter = createTRPCRouter({
	date: publicProcedure.input(z.string()).query((opts) => {
		console.log('Inside getUser');
		console.log({ opts });
		return { id: opts.input, name: 'Bilbo' };
	})
});

export type DateRouter = typeof dateRouter;
