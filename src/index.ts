import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { IncomingMessage, ServerResponse } from "http";
import url from "node:url";

interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: [];
}
const PORT: string | number = process.env.PORT || 3000;
const data: IUser[] = [
  { id: randomUUID(), username: "Zhanna", age: 37, hobbies: [] },
  { id: randomUUID(), username: "Alex", age: 11, hobbies: [] },
];

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "GET" && req.url === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else if (req.method === "GET") {
    const userId = req.url?.split("/")[3];
    console.log(userId);
    const user = data.filter((el) => el.id === userId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const id = randomUUID();
      const newBody = JSON.parse(body);
      const { username, age, hobbies } = newBody;
      const newUserData = { id, username, age, hobbies };
      if (username && age && hobbies) {
        data.push(newUserData);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `Invalid data (messed some field userName, age, hobbies)`,
          }),
        );
      }
    });
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
