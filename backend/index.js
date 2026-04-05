import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger-output.json' assert { type: 'json' };

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoutes);
app.use("/api/application", applicationRoutes);

// Swagger docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running at ${PORT}`);
});