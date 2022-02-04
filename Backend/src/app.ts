import express from 'express';
import bodyParser from 'body-parser';

const app = express();
//app.use(bp.json()) looks at requests where the Content-Type: application/json header is present 
//and transforms the text-based JSON
// input into JS-accessible variables under req.body. app.use(bp.urlencoded({extended: true})
// does the same for URL-encoded requests.


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Below code helps to remove CORS-ERRORS by adding some response headers.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

export default app;