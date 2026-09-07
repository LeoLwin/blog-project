import jwt from "jsonwebtoken";
import * as Response from "../config/response.helper.js";
import config from "../config/config.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.json(
            Response.unauthorized("Token Required")
        );
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return res.json(
            Response.unauthorized("Invalid Authorization Format")
        );
    }

    try {
        const verifyData = jwt.verify(
            token,
            config.JWT_SECRET
        );

        req.makyawtUser = verifyData;

        next();
    } catch (error) {
        return res.json(
            Response.unauthorized("Invalid Token")
        );
    }
};

export default authMiddleware;