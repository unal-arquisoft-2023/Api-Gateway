
export const regMedTypeDef = `
  type RegistroMedico {
    id: Int!
    detail: String!
    createdAt: String!
    updatedAt: String!
  }
  input RegistroMedicoInput {
    detail: String!
  }`;


export const regMedsQueries = `
      allRegistrosMedicos: [RegistroMedico]!
      registroMedicoById(id: Int!): RegistroMedico!
      registrosMedicosByIds(ids: [Int!]!): [RegistroMedico]!
  `;

export const regMedsMutations = `
    createRegistroMedico(detail: RegistroMedicoInput!): RegistroMedico!
    updateRegistroMedico(id: Int!, detail: RegistroMedicoInput!): RegistroMedico!
    deleteRegistroMedico(id: Int!): Int
`;