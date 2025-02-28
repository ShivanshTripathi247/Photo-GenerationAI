import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[0];

    try {
        const decoded = jwt.decode(token, process.env.AUTH_JWT_KEY, {
            algorithms: ['RS256'] 
        })
        console.log(decoded);
        next();
    }
    catch(e) {
        res.status(403).json({
            message: "Error while decoding"
        })
    }
    

}