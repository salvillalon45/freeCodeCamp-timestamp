import express from 'express';
import {
	isDateInputValid,
	getUnixTimestamp,
	getUTCString,
	mapToObject,
	PORT,
	test
} from './utils';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/:date?', function (req, res, next) {
	console.log('in the route');
	const { params } = req;
	const { date: reqParamsDate } = params;

	const date = reqParamsDate;
	const result: Map<string, string | number> = new Map();
	let unixTimestamp = 0;
	let utcString = '';
	let dateInput: string | number | Date = date;

	if (date === undefined) {
		dateInput = new Date();
	} else {
		const checkForDate = Number(dateInput);

		if (checkForDate) {
			// it is a number
			dateInput = checkForDate;
		} else {
			// it is a string
			dateInput = new Date(date);
		}
	}

	console.log({ dateInput });

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
