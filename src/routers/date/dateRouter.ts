import { createTRPCRouter, publicProcedure } from '../../trpc/trpc';
import { dateSchema } from '../../schema/date/date.schema';
import dateRouterHandler from './dateRouterHandler';
import { z } from 'zod';

export const dateRouter = createTRPCRouter({
	date: publicProcedure
		// input(dateSchema)
		.input(z.object({ date: z.string() }))
		.query((opts) => {
			console.log('Inside getUser');
			console.log({ opts });
			const { input } = opts;
			console.log(input);
			// const { date } = input;
			// console.log('Got the date');
			// console.log({ date });
			// const convertedDate = new Date(date * 1000); // Convert UNIX timestamp to JavaScript Date
			// console.log({ convertedDate });
			return { id: opts.input, name: 'Bilbo' };
		})
});

export type DateRouter = typeof dateRouter;
