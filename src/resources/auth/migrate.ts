import { authRepoMs } from ".";


export const migrate = async () => {
  const newUsrRes = await authRepoMs.register('123123123', '123', '13','patient');
}