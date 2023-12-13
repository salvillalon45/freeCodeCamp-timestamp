import moment from 'moment';

export function dateFormat(dateInput: string | number) {
	const momentInstance = moment.utc(dateInput);
	const unixTimestamp = momentInstance.unix();
	const utcString =
		momentInstance.format('ddd, D MMM YYYY HH:mm:ss') + ' GMT';

	return { unixTimestamp, utcString };
}

export function getUnixTimestamp(dateInput: string | number) {
	return moment.utc(dateInput).unix();
}

export function getUTCString(dateInput: string | number) {
	return moment.utc(dateInput).format('ddd, D MMM YYYY HH:mm:ss') + ' GMT';
}
