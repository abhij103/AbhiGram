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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = void 0;
const mongodb_1 = require("mongodb");
let _db;
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    //   MongoClient.connect(
    //     `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zwbuo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
    //   )
    //     .then(client => {
    //       console.log('Connected!');
    //       _db = client.db();
    //       callback();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       throw err;
    //     });
    const client = yield mongodb_1.MongoClient.connect(`mongodb+srv://root:98765432@cluster0.zwbuo.mongodb.net/AbhiGramDb?retryWrites=true&w=majority`);
    _db = client.db();
    return;
});
exports.mongoConnect = mongoConnect;
