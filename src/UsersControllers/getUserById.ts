import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "../helpers/dataUsers";
import { validate as uuidValidate } from "uuid";
import { IUser } from "./../helpers/interfaceTS";

export const getUserById = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.url?.startsWith("/api/users/")) {
    const userId: string = req.url?.split("/")[3];
    if (!uuidValidate(userId)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("userId is invalid");
    } else {
      const user: IUser | undefined = dataAllUsers.find(
        (el: IUser) => el.id === userId,
      );
      if (!user) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("User not found");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
      }
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(`Page not found`));
  }
};
