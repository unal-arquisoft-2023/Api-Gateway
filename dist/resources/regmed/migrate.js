"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = void 0;
const implementation_1 = require("./implementation");
function migrate() {
    return __awaiter(this, void 0, void 0, function* () {
        const medicalRecords = [
            {
                detail: "Medical Record 1",
            },
            {
                detail: "Medical Record 2",
            },
            {
                detail: "Medical Record 3",
            },
            {
                detail: "Medical Record 4",
            },
            {
                detail: "Medical Record 5",
            }
        ];
        medicalRecords.forEach((medicalRecord) => __awaiter(this, void 0, void 0, function* () {
            yield implementation_1.regmedRepoMs.create(medicalRecord.detail);
        }));
    });
}
exports.migrate = migrate;
