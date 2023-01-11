import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "../helpers/dataUsers";

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/api/users/")) {
    const userId = req.url?.split("/")[3];
    const user = dataAllUsers.find((el) => el.id === userId);
    if (!user) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("User not found");
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(`Page not found`));
  }
};
