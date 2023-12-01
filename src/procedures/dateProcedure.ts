export function dateProcedureHandler(opts: t.InputOfProcedure) {
	console.log('Inside getUser');
	console.log({ opts });
	return { id: opts.input, name: 'Bilbo' };
}
