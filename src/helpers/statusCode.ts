import { ServerResponse } from "http";
import { IUser } from "./interfaceTS";

export const pageNotFoundCode404 = (res: ServerResponse): void => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Page not found" }));
};

export const invalidDataAboutUserCode400 = (res: ServerResponse): void => {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Invalid data (missing some field userName, age or hobbies)",
    }),
  );
};

export const userNotFoundCode404 = (res: ServerResponse) => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end(JSON.stringify({ message: "User not found" }));
};

export const userIdInvalidCode400 = (res: ServerResponse) => {
  res.writeHead(400, { "Content-Type": "text/plain" });
  res.end(JSON.stringify({ message: "userId is invalid" }));
};

export const getOrUpdateDataCode200 = (
  res: ServerResponse,
  data: IUser | [] | string | {},
) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const getCreatedDataCode201 = (res: ServerResponse, data: IUser[]) => {
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
export const getNewDataCode204 = (res: ServerResponse) => {
  console.log("g");
  res.writeHead(204, { "Content-Type": "application/json" });
  res.end();
};
