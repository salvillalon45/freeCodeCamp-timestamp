"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUTCString = exports.getUnixTimestamp = exports.isDateInputValid = exports.mapToObject = exports.PORT = void 0;
const moment_1 = __importDefault(require("moment"));
exports.PORT = 3000;
function mapToObject(map) {
    return Object.fromEntries(map.entries());
}
exports.mapToObject = mapToObject;
function isDateInputValid(dateInput) {
    return moment_1.default.utc(dateInput).isValid();
}
exports.isDateInputValid = isDateInputValid;
function getUnixTimestamp(dateInput) {
    return moment_1.default.utc(dateInput).unix();
}
exports.getUnixTimestamp = getUnixTimestamp;
function getUTCString(dateInput) {
    return moment_1.default.utc(dateInput).format('ddd, D MMM YYYY HH:mm:ss') + ' GMT';
}
exports.getUTCString = getUTCString;
