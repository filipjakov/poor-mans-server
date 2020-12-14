import { Socket } from "dgram";
import { createServer } from "net";

const prettyParse = (arg: unknown) => JSON.stringify(arg, null, 2);
const onError = (error: Error) => {
  console.error(error);
  throw error;
};

const onConnection = (socket: Socket) => {
  // console.log("Socket connected: ", socket.address());

  socket
    .on("close", (hadError: boolean) => {
      if (hadError) {
        console.error("Socket closed, had error: ", socket.address());
      } else {
        console.info("Socket closed: ", socket.address());
      }
    })
    .on("data", (data: Buffer | string) => {
      console.log(`Data incoming: \n${data.toString()}`);
    })
    .on("drain", () => console.info("DRAINED!"))
    .on("end", () => console.info("END"))
    .on("error", onError)
    .on("timeout", () => console.info("TIMEOUT"));
  // .on("ready", () => console.info("READY"));
  // .on("connect", () => console.info("Socket connected: ", socket.address()));
};

const server = createServer();
server
  .on("close", () => console.log("Closed"))
  .on("connection", onConnection)
  .on("error", onError)
  .on("listening", () => console.info("Listening"))
  .listen(
    {
      host: "localhost",
      port: 3000,
      exclusive: true,
    },
    () => {
      console.info(`Server listening on ${prettyParse(server.address())}`);
    }
  );

// setTimeout(() => server.close(), 10 * 1000);

// setInterval(() => {
//   server.getConnections((error, count) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.info(`Number of connections: ${count}`);
//     }
//   });
// }, 5 * 1000);
