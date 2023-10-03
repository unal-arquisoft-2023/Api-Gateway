export const typeDefsAuth = `
  type TokenResponse {
    accessToken: String!
    tokenType: String!
  }
`

export const authQueries = `
  getToken(username: String!, password: String!, scope: String!): TokenResponse!
`