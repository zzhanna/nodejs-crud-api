import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "./interfaceTS";
import { invalidIncomingDataCode400 } from "./statusCode";

export const getBodyRequest = (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<IUser> => {
  return new Promise((resolve) => {
    let body: string = "";
    req
      .on("data", (chunk) => {
        body += chunk.toString();
      })
      .on("end", async () => {
        try {
          const newBody = await JSON.parse(body);
          resolve(newBody);
        } catch {
          invalidIncomingDataCode400(res);
        }
      });
  });
};
