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

	// Check if it is a string
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

	const utcString = getUTCString(dateInput);
	const unixTimestamp = getUnixTimestamp(dateInput);
	responseObject.set('unix', unixTimestamp);
	responseObject.set('utc', utcString);

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
// 	console.log('in the route');
// 	const { params } = req;
// 	const { date: reqParamsDate } = params;

// 	const result: Map<string, string | number> = new Map();
// 	let dateInput: string | number | Date;

// 	if (reqParamsDate === undefined) {
// 		dateInput = new Date();
// 	} else {
// 		const checkForDate = Number(reqParamsDate);
// 		console.log({ checkForDate });
// 		if (checkForDate) {
// 			// it is a number
// 			console.log('It is a number!');
// 			dateInput = checkForDate;
// 		} else {
// 			// it is a string
// 			console.log('it is a NaN!');
// 			dateInput = new Date(reqParamsDate);
// 		}
// 	}

// 	console.log({ reqParamsDate, dateInput });

// 	if (isDateInputValid(dateInput) === false) {
// 		console.log('Invalid date');
// 		res.send({ error: 'Invalid Date' });
// 		return;
// 	}

// 	const utcString = getUTCString(dateInput);
// 	const unixTimestamp = getUnixTimestamp(dateInput);
// 	result.set('unix', unixTimestamp);
// 	result.set('utc', utcString);

// 	const resultObject = mapToObject(result);
// 	console.log({ resultObject });
// 	res.send(resultObject);
// });

let responseObject = {};
app.get('/api/:input', function (req, res) {
	let input: string | number = req.params.input;

	if (input.includes('-') || input.includes(' ')) {
		responseObject['unix'] = new Date(input).getTime();
		responseObject['utc'] = new Date(input).toUTCString();
	} else {
		input = parseInt(input);
		responseObject['unix'] = new Date(input).getTime();
		responseObject['utc'] = new Date(input).toUTCString();
	}

	if (!responseObject['unix'] || !responseObject['utc']) {
		res.json({ error: 'Invalid Date' });
	}

	res.json(responseObject);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
