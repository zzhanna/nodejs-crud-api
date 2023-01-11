import { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "node:crypto";
import { dataAllUsers } from "../helpers/dataUsers";

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/api/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const id = randomUUID();
      const newBody = JSON.parse(body);
      const { username, age, hobbies } = newBody;
      const newUserData = { id, username, age, hobbies };
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
