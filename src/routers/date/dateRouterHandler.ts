import { ProcedureParams } from '@trpc/server';
import { ResolveOptions } from '@trpc/server/dist/core/internals/utils';

export const dateRouterHandler = (opts: ResolveOptions<ProcedureParams>) => {
	return { date: new Date() };
};

// (opts) => {
//     console.log('Inside getUser');
//     console.log({ opts });
//     return { id: opts.input, name: 'Bilbo' };
// }

export default dateRouterHandler;
