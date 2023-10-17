"use strict";
/*

type PatientData {
  id: Int!
  cardId: String!
  name: String!
  affiliation:  AffiliationType!
  affiliationDate: LocalDate!
}


myInfo: PatientData!

*/
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
const auth_1 = require("../../../resources/auth");
const users_1 = require("../../../resources/users");
const myInfo = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenRaw = context.request.header.authorization;
    // extract token from "Bearer <token>"
    const token = tokenRaw.split(" ")[1];
    const { userId } = yield auth_1.authRepoMs.me(token);
    console.log(userId, "got hereeee");
    const patientData = yield users_1.patientRepoMs.get(userId);
    console.log(patientData.registrationDate);
    const patientDataWithAffiliation = {
        id: patientData.id,
        cardId: patientData.cardId,
        name: `${patientData.name.firstName} ${patientData.name.lastName}`,
        affiliation: patientData.affiliation,
        affiliationDate: (new Date(Date.now())).toISOString().split("T")[0]
    };
    return patientDataWithAffiliation;
});
exports.default = myInfo;
