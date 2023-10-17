"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medium = exports.Status = void 0;
var Status;
(function (Status) {
    Status["NOTIFIED"] = "NOTIFIED";
    Status["PARTIAL"] = "PARTIAL";
    Status["UNNOTIFIED"] = "UNNOTIFIED";
})(Status || (exports.Status = Status = {}));
var Medium;
(function (Medium) {
    Medium["SMS"] = "SMS";
    Medium["GMAIL"] = "GMAIL";
    Medium["CALL"] = "CALL";
    Medium["WAPP"] = "WAPP";
})(Medium || (exports.Medium = Medium = {}));
