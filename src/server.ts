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
  pageNotFoundCode404,
  requestNotFoundCode400,
} from "./helpers/statusCode";

export const serverRun = () => {
  dotenv.config();
  const PORT: string | number = Number(process.env.PORT) || 5000;

  const server = createServer(
    (req: IncomingMessage, res: ServerResponse): void => {
      if (req.method === "GET") {
        if (req.url === "/api/users") {
          getOrUpdateDataCode200(res, dataAllUsers);
          return;
        } else if (req.url?.startsWith("/api/users/")) {
          getUserById(req, res);
          return;
        }
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
      if (!req.method?.includes("GET" || "POST" || "PUT" || "DELETE")) {
        return requestNotFoundCode400(res);
      }
      return pageNotFoundCode404(res);
    },
  );

  server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

  return server;
};
