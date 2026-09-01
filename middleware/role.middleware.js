import * as Response from "../config/response.helper.js";


const roleMiddleware = (...roles) => {
    console.log("roles", roles);


    return (req, res, next) => {
        console.log("req.makyawtUser.role", req.makyawtUser);
        const check = roles.includes(req.makyawtUser.role);
        console.log("check", check);
        if (!roles.includes(req.makyawtUser.role)) {


            return res.json(Response.forbidden("Access denied"));


        }


        next();


    };


};


export default roleMiddleware;
