import { IncomingMessage } from "http";
import { IUser } from "./interfaceTS";

export const getBodyRequest = (req: IncomingMessage): Promise<IUser> => {
  return new Promise((res) => {
    let body: string = "";
    req
      .on("data", (chunk) => {
        body += chunk.toString();
      })
      .on("end", async () => {
        const newBody = await JSON.parse(body);
        res(newBody);
      });
  });
};
