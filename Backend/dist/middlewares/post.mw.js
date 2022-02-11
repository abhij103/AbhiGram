"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostReqChecker = void 0;
const express_validator_1 = require("express-validator");
exports.createPostReqChecker = [
    (0, express_validator_1.body)('title').trim().isLength({ min: 5 }).withMessage('Min length 5 chars'),
    (0, express_validator_1.body)('title').trim().matches(/^[a-zA-Z0-9_\.\- ]*$/).withMessage('Only .-_ special chars allowed')
];
