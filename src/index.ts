import * as dotenv from "dotenv";
import { createServer } from "node:http";
import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "./helpers/dataUsers";
import { createUser } from "./UsersControllers/createUser";
import { getUserById } from "./UsersControllers/getUserById";

dotenv.config();

const PORT: string | number = process.env.PORT || 5000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "GET") {
    if (req.url === "/api/users") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(dataAllUsers));
    } else {
      getUserById(req, res);
    }
  }
  if (req.method === "POST") {
    createUser(req, res);
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
