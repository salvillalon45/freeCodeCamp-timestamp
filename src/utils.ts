import moment from 'moment';

export const PORT = 3000;

export function mapToObject(map: Map<string, string | number>) {
	return Object.fromEntries(map.entries());
}

export function isDateInputValid(dateInput: string | number) {
	return moment.utc(new Date(dateInput)).isValid();
}

export function getUnixTimestamp(dateInput: string | number) {
	return new Date(dateInput).getTime();
}

export function getUTCString(dateInput: string | number) {
	return new Date(dateInput).toUTCString();
}
