import express from "express";
import bodyParser from "body-parser"; //get params from client
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import dotenv from "dotenv";
import connectDB from "./config/conectDb";
import initAPIRoutes from "./routes/API";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));

//config app

app.use(bodyParser.json()); //get params from client
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initAPIRoutes(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("running on port:", `http://localhost:${port}`);
});
