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
const database_1 = require("../utils/database");
// const ObjectId = mongodb.ObjectId;
class User {
    constructor(email, password, name, status) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.status = status;
    }
    addUser() {
        const db = (0, database_1.getDb)();
        return db
            .collection('users')
            .insertOne(this);
    }
    static findUserById(userId) {
        const db = (0, database_1.getDb)();
        return db
            .collection('users')
            .findOne({ _id: userId });
    }
    static findUserByEmail(searchEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = (0, database_1.getDb)();
            const user = yield db.collection('users').findOne({ email: searchEmail });
            return Promise.resolve(user);
            //   .collection('users')
            //   .findOne({ email : searchEmail })
            //   .then(user => {
            //     return user; //it's also retuned as a promise, but it resolves instantly
            //   })
            //   .catch(err => {
            //     console.log(err);
            //   });
        });
    }
}
exports.default = User;
