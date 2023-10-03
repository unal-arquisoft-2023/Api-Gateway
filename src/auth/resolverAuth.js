import { requestFormData } from '../utilities'
import { url, port } from './serverAuth'

const URL = `http://${url}:${port}`

const resolvers = {
  Query: {
    getToken: async (_, { username, password, scope }) => {
      const res = JSON.parse(await requestFormData(`${URL}/token`,'POST',{username, password, scope}))
      const adaptedResponse = {
        accessToken: res.access_token,
        tokenType: res.token_type
      }
      console.log(adaptedResponse)
      return adaptedResponse
    }
  }
}

export default resolvers