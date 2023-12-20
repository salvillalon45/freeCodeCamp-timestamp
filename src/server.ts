import express from 'express';
import {
	isDateInputValid,
	getUnixTimestamp,
	getUTCString,
	mapToObject,
	PORT
} from './utils';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/:date', function (req, res, next) {
	const { date: reqParamsDate } = req.params;

	const isItNumber = Number(reqParamsDate);
	const responseObject: Map<string, string | number> = new Map();
	let dateInput: string | number | Date;

	if (isItNumber) {
		// it is a number
		dateInput = isItNumber;
	} else {
		// it is a string
		dateInput = reqParamsDate;
	}

	if (isDateInputValid(dateInput) === false) {
		res.send({ error: 'Invalid Date' });
		return;
	}

	responseObject.set('unix', getUnixTimestamp(dateInput));
	responseObject.set('utc', getUTCString(dateInput));

	const resultObject = mapToObject(responseObject);
	console.log({ resultObject });
	res.send(resultObject);
});

app.get('/api', function (req, res) {
	const responseObject: Map<string, string | number> = new Map();

	responseObject.set('unix', new Date().getTime());
	responseObject.set('utc', new Date().toUTCString());

	res.send(mapToObject(responseObject));
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
