import { z } from 'zod';

// export const dateSchema = z.object({
// 	// date: z.date({
// 	// 	required_error: 'Date is required',
// 	// 	invalid_type_error: 'Date must be a date'
// 	// })
// 	date: z.number()
// });
export const dateSchema = z.string();
// export const dateSchema = z.number().or(z.any());
