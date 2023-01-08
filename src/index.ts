import { createServer } from "node:http";

const PORT: string | number = process.env.PORT || 3000;

const server = createServer((req, res) => {
  res.writeHead(200, {
    "Content-type": "application/json",
  });
  if (req.url === "/users") {
    return res.end(JSON.stringify([{ id: 1, name: "Zhanna" }]));
  }
  if (req.url === "/posts") {
    return res.end("POSTS");
  }
  res.end(req.url);
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
