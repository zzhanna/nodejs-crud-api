import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "../helpers/dataUsers";
import { validate as uuidValidate } from "uuid";
import { IUser } from "./../helpers/interfaceTS";
import {
  getOrUpdateDataCode200,
  pageNotFoundCode404,
  userIdInvalidCode400,
  userNotFoundCode404,
} from "../helpers/statusCode";

export const getUserById = (
  req: IncomingMessage,
  res: ServerResponse,
): void | IUser => {
  if (req.url?.startsWith("/api/users/")) {
    const userId: string = req.url?.split("/")[3];
    if (!uuidValidate(userId)) {
      userIdInvalidCode400(res);
    } else {
      const user: IUser | undefined = dataAllUsers.find(
        (el: IUser) => el.id === userId,
      );
      if (!user) {
        userNotFoundCode404(res);
      } else if (req.method === "GET") {
        getOrUpdateDataCode200(res, user);
      } else if (req.method === "PUT" || req.method === "DELETE") {
        return user;
      } else {
        pageNotFoundCode404(res);
      }
    }
  }
};
