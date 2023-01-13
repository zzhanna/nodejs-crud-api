import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "../helpers/dataUsers";
import { IUser } from "../helpers/interfaceTS";
import { getUserById } from "./getUserById";
import {
  getNewDataCode204,
  invalidDataAboutUserCode400,
  pageNotFoundCode404,
} from "../helpers/statusCode";

export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  if (req.url?.startsWith("/api/users/")) {
    try {
      const userById = (await getUserById(req, res)) as IUser;
      const id = userById.id;
      if (id) {
        const indUserDel = dataAllUsers.findIndex((el) => el.id === id);
        dataAllUsers.splice(indUserDel, 1);
        getNewDataCode204(res);
      } else {
        invalidDataAboutUserCode400(res);
      }
    } catch {
      pageNotFoundCode404(res);
    }
  } else {
    pageNotFoundCode404(res);
  }
};
