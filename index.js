import express from "express";
import  cors from "cors";
import router from "./router/index.js"
import bodyParser from "body-parser";


const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`your server listening on port number ${port}`);
  });
