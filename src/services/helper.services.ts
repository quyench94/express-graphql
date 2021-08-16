import * as request from "request"
import * as bcrypt from 'bcrypt';

export const httpRequest = (options: any) => {
  return new Promise((r, j) => {
    request.default(options, (err: Error, res: request.Response, body: request.ResponseAsJSON) => {
      if (err) return j(err);
      return r(body)
    })
  })
}

export const hashPassword = async (inputPassword: string, saltRound: number) => {
  const passwordHashed = await bcrypt.hash(inputPassword, saltRound);
  return passwordHashed;
}

export const comparePasswordHashed = async (passwordHashed: string, password: string) => {
  const isHashedMatch = await bcrypt.compare(password, passwordHashed);
  return isHashedMatch;
}