import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth/auth.js";

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const PORT = 9000;
app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
});
