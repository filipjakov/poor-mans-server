import { Server, createServer, ServerResponse, IncomingMessage } from "http";

const server: Server = createServer();

server.on("request", (req: IncomingMessage, res: ServerResponse) => {
  console.log(req.url);
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World!");
});

server.listen(3000, undefined, undefined, () => {
  console.log("Listening on 3000");
});
