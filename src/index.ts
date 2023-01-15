import * as dotenv from "dotenv";
import { createServer } from "node:http";
import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "./helpers/dataUsers";
import { createUser } from "./UsersControllers/createUser";
import { getUserById } from "./UsersControllers/getUserById";
import { updateUser } from "./UsersControllers/updateUser";
import { deleteUser } from "./UsersControllers/deleteUser";
import {
  getOrUpdateDataCode200,
  requestNotFoundCode400,
} from "./helpers/statusCode";

dotenv.config();

const PORT: string | number = process.env.PORT || 5000;

const server = createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    if (req.method === "GET") {
      if (req.url === "/api/users") {
        getOrUpdateDataCode200(res, dataAllUsers);
      } else {
        getUserById(req, res);
      }
      return;
    }
    if (req.method === "POST") {
      createUser(req, res);
      return;
    }
    if (req.method === "PUT") {
      updateUser(req, res);
      return;
    }
    if (req.method === "DELETE") {
      deleteUser(req, res);
      return;
    }
    requestNotFoundCode400(res);
  },
);

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
