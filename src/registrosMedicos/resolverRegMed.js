import { generalRequest } from "../utilities";
import {url, port, entryPoint} from './serverRegMed'

const URL =  `http://${url}:${port}/${entryPoint}`




const resolvers = {
  Query: {
    allRegistrosMedicos: (_) =>
      generalRequest(`${URL}/getAll`, "GET"),
    registroMedicoById: (_, { id }) =>
      generalRequest(`${URL}/get/${id}`, "GET"),
    registrosMedicosByIds: (_, { ids }) =>
      generalRequest(`${URL}/getMany`, "POST", { ids }),
  },
  Mutation: {
    createRegistroMedico: (_, { detail }) =>
      generalRequest(`${URL}/create`, "POST", detail),
    updateRegistroMedico: (_, { id, detail }) =>
      generalRequest(`${URL}/update/${id}`, "PUT", detail),
    deleteRegistroMedico: (_, { id }) =>
      generalRequest(`${URL}/delete/${id}`, "DELETE"),
  },
}

export default resolvers



