import { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "node:crypto";
import { dataAllUsers } from "../helpers/dataUsers";
import { IUser } from "./../helpers/interfaceTS";

export const createUser = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.url === "/api/users") {
    let body: string;
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const id = randomUUID();
      const newBody: IUser = JSON.parse(body);
      const { username, age, hobbies } = newBody;
      const newUserData: IUser = { id, username, age, hobbies };
      if (username && age && hobbies) {
        dataAllUsers.push(newUserData);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dataAllUsers));
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `Invalid data (missing some field userName, age or hobbies)`,
          }),
        );
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(`Page not found`));
  }
};
