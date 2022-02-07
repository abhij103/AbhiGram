import {body} from 'express-validator';

export const createPostReqChecker = [
    body('title').trim().isLength({ min: 5 }).withMessage('Min length 5 chars'),
    body('title').trim().matches(/^[a-zA-Z0-9_\.\- ]*$/).withMessage('Only .-_ special chars allowed')
]