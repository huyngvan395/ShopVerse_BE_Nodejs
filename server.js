import express from "express";
import dotenv from "dotenv";
import sequelize from "./configs/database.js";
import {User} from "./models/index.js";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import errorHandler from "./middlewares/errorHandler.js";
import {fileURLToPath} from "url";
import path from "path";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app  = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/assets/images/user', express.static(path.join(__dirname, 'assets/images/user')));
app.use('/assets/images/products', express.static(path.join(__dirname, 'assets/images/products')));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({message: "Welcome to Express Sequelize API"})
});

const port = process.env.PORT || 3333;

app.listen(port, async() => {
    console.log(`Server is running on port ${port} and thank you for using Express Sequelize API`)
    try {
        await sequelize.authenticate()
        console.log("Database connection has been established successfully.")
    } catch (error) {
        console.error("Unable connect to the database: ", error)
    }
})