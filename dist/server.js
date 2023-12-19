"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.get('/api/date/:date?', function (req, res, next) {
    const { params } = req;
    const { date: reqParamsDate } = params;
    const date = reqParamsDate !== null && reqParamsDate !== void 0 ? reqParamsDate : new Date();
    let result = new Map();
    let unixTimestamp = 0;
    let utcString = '';
    let dateInput = date;
    if (typeof date === 'string') {
        const dashIndex = date.indexOf('-');
        if (dashIndex >= 0) {
            // it contains a dash
            dateInput = date;
        }
        else if (dashIndex <= -1) {
            // No dash
            dateInput = parseInt(date);
        }
    }
    if ((0, utils_1.isDateInputValid)(dateInput) === false) {
        res.send({ error: 'Invalid Date' });
        return;
    }
    utcString = (0, utils_1.getUTCString)(dateInput);
    unixTimestamp = (0, utils_1.getUnixTimestamp)(dateInput);
    result.set('unix', unixTimestamp);
    result.set('utc', utcString);
    const resultObject = (0, utils_1.mapToObject)(result);
    res.send(resultObject);
});
app.listen(utils_1.PORT, () => {
    console.log(`Server is running on port ${utils_1.PORT}`);
});
