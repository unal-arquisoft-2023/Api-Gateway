import { generalRequest } from "../utilities";
import { url, port, entryPoint } from './serverRegMed'

const URL = `http://${url}:${port}/${entryPoint}`


const getData = (promise) => promise.then((data) => data.data)


const resolvers = {
  Query: {
    allRegistrosMedicos: (_) =>
      getData(generalRequest(`${URL}/getAll`, "GET")),
    registroMedicoById: (_, { id }) =>
      getData(generalRequest(`${URL}/get/${id}`, "GET")),
    registrosMedicosByIds: (_, { ids }) =>
      getData(generalRequest(`${URL}/getMany`, "POST", { ids })),
  },
  Mutation: {
    createRegistroMedico: (_, { detail }) => 
     getData(generalRequest(`${URL}/create`, "POST", detail)),
  },
}

export default resolvers



