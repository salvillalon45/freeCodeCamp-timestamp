import { mergeRouters } from '../trpc/trpc';
import { dateRouter } from './date/dateRouter';

export const appRouter = mergeRouters(dateRouter);

export type AppRouter = typeof appRouter;
