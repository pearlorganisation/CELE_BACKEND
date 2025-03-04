import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dontenv from "dotenv";

// Create an Express application
const app = express();

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

dontenv.config();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5173", "http://localhost:5174"]
        : ["https://cele.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specify allowed methods
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

//Routes imports
import authRouter from "./src/routes/auth/authRoutes.js";
// import userRouter from "./src/routes/user/userRoutes.js";
import contactRouter from "./src/routes/contact/contactRoutes.js";
import obituaryRouter from "./src/routes/obituary/obituaryRoutes.js";
import serviceRouter from "./src/routes/services/servicesRoutes.js";
import subServiceRouter from "./src/routes/subServices/subServicesRoutes.js";
import { errorHandler, notFound } from "./src/utils/errors/errorHandler.js";
import reviewsRouter from "./src/routes/reviews/reviewRoutes.js";
import guestBookRouter from "./src/routes/guestbook/guestbookRoutes.js";
import photoGalleryRouter from "./src/routes/photoGallery/photoGalleryRoutes.js";
import mailRouter from "./src/routes/mail/sendmailRoute.js";
import candleRouter from "./src/routes/guestbook/candleRoutes.js"
import CreateProduct from "./src/routes/product/ProductsRoute.js"
import eulogyRouter from "./src/routes/eulogy/eulogyRoutes.js";
import cartRouter from "./src/routes/cart/cart.js"
app.get("/", (req, res) => {
  res.status(200).send("API Works!");
  console.log("This is Home route");
});

// Routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/obituaries", obituaryRouter);
// app.use("/api/v1/users", userRouter);

app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/services", serviceRouter);

app.use("/api/v1/subservices", subServiceRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/guestbook", guestBookRouter);
app.use("/api/v1/photo-gallery", photoGalleryRouter);
app.use("/api/v1/candle",candleRouter)
app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/eulogy",eulogyRouter)
app.use("/api/v1/products",CreateProduct)
app.use("/api/v1/cart",cartRouter)
app.use(notFound);
app.use(errorHandler);

export { app };
