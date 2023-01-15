import { IncomingMessage, ServerResponse } from "http";
import { dataAllUsers } from "../helpers/dataUsers";
import { getBodyRequest } from "../helpers/getBodyRequest";
import { IUser } from "../helpers/interfaceTS";
import { getUserById } from "./getUserById";
import {
  getOrUpdateDataCode200,
  invalidDataAboutUserCode400,
  pageNotFoundCode404,
} from "../helpers/statusCode";

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  if (req.url?.startsWith("/api/users/")) {
    try {
      const userById = getUserById(req, res) as IUser;
      const newBodyReq: IUser = await getBodyRequest(req, res);
      const id = userById?.id;
      const { username, age, hobbies } = newBodyReq;
      if (username && age && hobbies) {
        dataAllUsers.map((el) => {
          if (el.id === id) {
            el.username = username;
            el.age = age;
            el.hobbies = hobbies;
          }
        });
        getOrUpdateDataCode200(res, dataAllUsers);
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
