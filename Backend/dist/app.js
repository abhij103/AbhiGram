"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const post_route_1 = require("./routes/post.route");
const path_1 = __importDefault(require("path"));
const auth_route_1 = require("./routes/auth.route");
const app = (0, express_1.default)();
//app.use(bp.json()) looks at requests where the Content-Type: application/json header is present 
//and transforms the text-based JSON
// input into JS-accessible variables under req.body. app.use(bp.urlencoded({extended: true})
// does the same for URL-encoded requests.
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
//CC __dirname points to path location of current file.
app.use((0, express_fileupload_1.default)({ createParentPath: true })); // creates parent folder/path if doesn't exists when creating  file.
// Below code helps to remove CORS-ERRORS by adding some response headers.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS , PUT");
    next();
});
app.use('/auth', auth_route_1.authRoutes);
app.use('/post', post_route_1.postRoutes);
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
exports.default = app;
