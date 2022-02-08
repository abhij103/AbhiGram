import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import {postRoutes} from './routes/post.route';
import path from 'path';
import { authRoutes } from './routes/auth.route';
const app = express();
//app.use(bp.json()) looks at requests where the Content-Type: application/json header is present 
//and transforms the text-based JSON
// input into JS-accessible variables under req.body. app.use(bp.urlencoded({extended: true})
// does the same for URL-encoded requests.


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'images')));
//CC __dirname points to path location of current file.
app.use(fileUpload({createParentPath: true})); // creates parent folder/path if doesn't exists when creating  file.

// Below code helps to remove CORS-ERRORS by adding some response headers.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS , PUT"
  );
  next();
});

app.use('/auth',authRoutes)
app.use('/post', postRoutes);

app.use((error:any, req:Request, res:Response, next:NextFunction) => { //will only come here when error occursss.
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
export default app;