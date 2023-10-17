import { authRepoMs } from "../../../resources/auth";

const login = async (parent, args, context, info) => {
  console.log("here", parent, args,)
  const logRes = await authRepoMs.login(args.cardId, args.password);
  return {
    token: logRes.access_token,
    tokenType: logRes.token_type
  }
}

export default login;
