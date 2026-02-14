import express from "express";
import path from "path";

import { ENV } from "./lib/env.js";

const app = express();

const _dirname = path.resolve();


app.get("/", (req, res) => {
    res.status(200).json({ msg: "api is up and running" });
});

app.get("/books", (req, res) => {
    res.status(200).json({ msg: "this is the books endpoint" });
});


// make our app ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(ENV.PORT, () => console.log("Server is running on port",ENV.PORT));