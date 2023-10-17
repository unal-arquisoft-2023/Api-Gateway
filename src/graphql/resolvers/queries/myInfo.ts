
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

import { authRepoMs } from "../../../resources/auth";
import { patientRepoMs } from "../../../resources/users";

type PatientData = {
  id: string;
  cardId: string;
  name: string;
  affiliation: string;
  affiliationDate: string;
}

const myInfo = async (parent, args, context, info): Promise<PatientData> => {
  const tokenRaw = context.request.header.authorization;
  // extract token from "Bearer <token>"
  const token = tokenRaw.split(" ")[1];

  const {userId} = await authRepoMs.me(token);
  const patientData = await patientRepoMs.get(userId);
  const patientDataWithAffiliation = {
    id: patientData.id,
    cardId: patientData.cardId,
    name: `${patientData.name.firstName} ${patientData.name.lastName}`,
    affiliation: patientData.affiliation,
    affiliationDate: (new Date(Date.now())).toISOString().split("T")[0]
  }
  return patientDataWithAffiliation;
}

export default myInfo;