import { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "node:crypto";
import { dataAllUsers } from "../helpers/dataUsers";
import { getBodyRequest } from "../helpers/getBodyRequest";
import { IUser } from "./../helpers/interfaceTS";
import {
  getCreatedDataCode201,
  invalidDataAboutUserCode400,
  pageNotFoundCode404,
} from "./../helpers/statusCode";

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  if (req.url === "/api/users") {
    let body: IUser = await getBodyRequest(req, res);
    const id = randomUUID();
    const { username, age, hobbies } = body;
    const newUserData: IUser = { id, username, age, hobbies };
    if (username && age && hobbies) {
      dataAllUsers.push(newUserData);
      getCreatedDataCode201(res, dataAllUsers);
    } else {
      invalidDataAboutUserCode400(res);
    }
  } else {
    pageNotFoundCode404(res);
  }
};
