import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import notFount from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();

// Middleware
app.use(cors()); 
app.use(compression());  
app.use(express.json()); 

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFount);



export default app;
