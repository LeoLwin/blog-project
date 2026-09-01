import jwt from "jsonwebtoken";
import * as Response from "../config/response.helper.js";
import config from "../config/config.js";


const authMiddleware = (
    req,
    res,
    next
) => {

    console.log("req.headers : ", req.headers.authorization)
    const authHeader =
        req.headers.authorization;

    if (!authHeader) {

        return res.json(
            Response.unauthorized(
                "Token Required"
            )
        );

    }

    const token =
        authHeader.split(" ")[1];

    console.log("token : ", token[1])

    try {
        console.log("req.makyawtUser : ",req.makyawtUser);
        const verifyData =
            jwt.verify(
                token,
                config.JWT_SECRET
            );
        console.log("verifyData : ", verifyData);
        req.makyawtUser = verifyData;
        
        // req.user =
        //     jwt.verify(
        //         token,
        //         config.JWT_SECRET
        //     );

        next();


    } catch {



        return res.json(
            Response.unauthorized(
                "Invalid Token"
            )
        );




    }




};




export default authMiddleware;
