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
	console.log({ reqParamsDate });
	console.log('What is reqParamsDate typeof');
	console.log(typeof reqParamsDate);
	const date = reqParamsDate ?? new Date();
	const dashIndex = date.indexOf('-');
	console.log({ dashIndex });
	let result: Map<string, string | number> = new Map();
	let unixTimestamp = 0;
	let utcString = '';
	let dateInput: string | number | Date = date;

	if (dashIndex >= 0) {
		console.log('it contains a dash');
		dateInput = date;
	} else if (dashIndex <= -1) {
		console.log('No dash');
		dateInput = parseInt(date);
	} else {
		dateInput = new Date();
	}

	if (isDateInputValid(dateInput) === false) {
		console.log('Date is invalid');
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
