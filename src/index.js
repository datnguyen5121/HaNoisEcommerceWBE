import express from "express";
import env from "dotenv";
import routes from "./router/routes.js";
import connect from "./model/connectDB.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import querystring from "node:querystring";
const app = express();
env.config();
const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//config cookie -parser
app.use(cookieParser());

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  routes(app);
  await connect(dbUrl);
});
