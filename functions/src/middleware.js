import jwt from "jsonwebtoken";
import { secretKey } from "./creds.js";

export async function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    // first check IF THEY HAVE A TOKEN:
    if (!authorization) {
        res.status(401).send({ message: 'No authorization token found' });
        return;
    }

    // then check if the token is VALID:
    jwt.verify(authorization, secretKey, (err, decoded) => {
        if (err) {  // not valid token :
            res.status(401).send(err);
            return;
        }
        
        // valid token:
        req.locals = decoded; // attach our decoded token to the request
        // if so, go on
        next();
    });
}

