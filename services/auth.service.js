import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as repo from "../repositories/auth.repsitory.js";
import * as Response from "../config/response.helper.js";
import config from "../config/config.js";




export const login = async (payload) => {
    console.log("payload : ", payload)
    try {
        const user =
            await repo.findUserByEmail(
                payload.email
            );

        console.log("user : ", user)
        if (!user) {

            return Response.badRequest(
                "Invalid email or password"
            );


        };



        const match =
            await bcrypt.compare(
                payload.password,
                user.password
            );
        console.log("match : ", match)

        if (!match) {

            return Response.badRequest(
                "Invalid email or password"
            );

        }



        const token =
            jwt.sign(

                {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },

                config.JWT_SECRET,


                {
                    expiresIn: "1d"
                }


            );

        console.log("token : ", token)


        return Response.success(
            {
                token
            },
            "Login Success"
        );




    } catch (err) {




        return Response.internalServerError(
            err.message
        );




    }




};
