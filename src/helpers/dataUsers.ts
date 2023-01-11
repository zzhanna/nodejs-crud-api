import { IUser } from "./interfaceTS";
import { randomUUID } from "node:crypto";

export const dataAllUsers: IUser[] = [
  { id: randomUUID(), username: "Zhanna", age: 37, hobbies: [] },
  { id: randomUUID(), username: "Alex", age: 11, hobbies: [] },
];
