import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
    requireAuth({ signInUrl: "/sign-in" }), // this middleware will check if the user is authenticated, if not it will redirect to sign-in page
    async (req, res, next) => {
        try{
            const clerkId = req.auth().userId;

            if(!clerkId) return res.status(401).json({ msg: "Unauthorized - invalid token" });

            // find user in db by clerk ID
            const user = await User.findOne({clerkId});

            if(!user) return res.status(401).json({ msg: "User not found" });

            // attach user to req
            req.user = user;

            next();
        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }
];