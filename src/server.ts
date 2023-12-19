import express from 'express';
import {
	isDateInputValid,
	getUnixTimestamp,
	getUTCString,
	mapToObject,
	PORT
} from './utils';

const app = express();

app.get('/api/date/:date?', function (req, res, next) {
	console.log('in the route');
	const { params } = req;
	const { date: reqParamsDate } = params;

	const date = reqParamsDate ?? new Date();
	console.log({ date });
	let result: Map<string, string | number> = new Map();
	let unixTimestamp = 0;
	let utcString = '';
	let dateInput: string | number | Date = date;

	if (typeof date === 'string') {
		console.log('It is type string');
		const dashIndex = date.indexOf('-');
		console.log({ dashIndex });

		if (dashIndex >= 0) {
			// it contains a dash
			dateInput = date;
		} else if (dashIndex <= -1) {
			// No dash
			dateInput = parseInt(date);
		}

		console.log({ dateInput });
	}

	if (isDateInputValid(dateInput) === false) {
		console.log('Invalid date');
		res.send({ error: 'Invalid Date' });
		return;
	}

	utcString = getUTCString(dateInput);
	unixTimestamp = getUnixTimestamp(dateInput);
	result.set('unix', unixTimestamp);
	result.set('utc', utcString);

	const resultObject = mapToObject(result);
	console.log({ resultObject });
	res.send(resultObject);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
