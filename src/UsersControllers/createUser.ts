import { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "node:crypto";
import { dataAllUsers } from "../helpers/dataUsers";
import { getBodyRequest } from "../helpers/getBodyRequest";
import { isBodyDataValid } from "../helpers/isDataValid";
import { IUser } from "./../helpers/interfaceTS";
import {
  getCreatedDataCode201,
  invalidDataAboutUserCode400,
  notValidDataAboutUserCode400,
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
    const validData = isBodyDataValid(username, age, hobbies);

    if (validData && username && age && hobbies) {
      const newUserData: IUser = { id, username, age, hobbies };
      dataAllUsers.push(newUserData);
      getCreatedDataCode201(res, dataAllUsers);
    } else {
      validData
        ? invalidDataAboutUserCode400(res)
        : notValidDataAboutUserCode400(res);
    }
  } else {
    pageNotFoundCode404(res);
  }
};
