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
	const { params } = req;
	const { date: reqParamsDate } = params;

	const date = reqParamsDate ?? new Date();
	let result: Map<string, string | number> = new Map();
	let unixTimestamp = 0;
	let utcString = '';
	let dateInput: string | number | Date = date;

	if (typeof date === 'string') {
		const dashIndex = date.indexOf('-');

		if (dashIndex >= 0) {
			// it contains a dash
			dateInput = date;
		} else if (dashIndex <= -1) {
			// No dash
			dateInput = parseInt(date);
		}
	}

	if (isDateInputValid(dateInput) === false) {
		res.send({ error: 'Invalid Date' });
		return;
	}

	utcString = getUTCString(dateInput);
	unixTimestamp = getUnixTimestamp(dateInput);
	result.set('unix', unixTimestamp);
	result.set('utc', utcString);

	const resultObject = mapToObject(result);
	res.send(resultObject);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
