import express from "express";
import env from "dotenv";
import routes from "./router/routes.js";
import connect from "./model/connectDB.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import querystring from "node:querystring";
import cors from "cors";

const app = express();
env.config();
const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//config cookie-parser
app.use(cookieParser());

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  routes(app);
  await connect(dbUrl);
});
