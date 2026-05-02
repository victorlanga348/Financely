import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./src/Routes/public/userRoutes.js";
import transitionRoutes from "./src/Routes/private/transitionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({ origin: "*" }));

// Public routes
app.use('/user', userRoutes);

// Private routes
app.use('/transition', transitionRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});