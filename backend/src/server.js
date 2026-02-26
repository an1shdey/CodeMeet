import express from "express";
import path from "path";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";

const app = express();

const _dirname = path.resolve();

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("api/inngest", server({ client: inngest, functions }));
app.use("api/chat", chatRoutes);

app.get("/health", (req, res) => {
    req.auth;
    res.status(200).json({ msg: "api is up and running" });
});


// make our app ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
    });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();