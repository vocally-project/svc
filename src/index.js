import Server from "./server";
import configuration from "./configuration";

const server = new Server(configuration);

server.initializeBodyParser()
server.setupRoute()
server.run();