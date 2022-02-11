"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const database_1 = require("./utils/database");
const debug = (0, debug_1.default)("AppName");
const normalizePort = (val) => {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
        default:
            throw error;
    }
};
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
};
const port = normalizePort(process.env.PORT || "3000");
app_1.default.set("port", port);
// The below code is just long form app.listen() no need of this, but used just 4 fun learning.
const server = http_1.default.createServer(app_1.default);
server.on("error", onError);
server.on("listening", onListening);
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.mongoConnect)();
        server.listen(port);
    }
    catch (err) {
        throw err;
    }
});
dbConnect();
