import express from 'express';
import { dateFormat } from './utils';

const app = express();
const port = 3000;

const mapToObject = (map) => Object.fromEntries(map.entries());

app.get('/api/date/:date', function (req, res, next) {
	const { params } = req;
	const { date } = params;
	console.log({ date });
	console.log('What is date typeof');
	console.log(typeof date);

	const dashIndex = date.indexOf('-');
	console.log({ dashIndex });
	let result: Map<string, string | number> = new Map();
	let unixTimestamp = 0;
	let utcString = '';

	if (dashIndex >= 0) {
		console.log('it contains a dash');
		const { unixTimestamp, utcString } = dateFormat(date);
		unixTimestamp = unixTimestamp;

		console.log({ result });
	} else {
		console.log('No dash');
		const [unixTimestamp, utcString] = dateFormat(parseInt(date));

		result.set('unix', unixTimestamp);
		result.set('utc', utcString);
	}
	// const resultObject = mapToObject(result);
	res.send('hello');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
