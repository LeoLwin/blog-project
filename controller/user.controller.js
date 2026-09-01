import { Router } from "express";
import * as userService from "../services/user.service.js";
import * as Response from "../config/response.helper.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js"

const router = Router();

router.post("/register", async (req, res) => {
    try {
        console.log("req.body : ", req.body)
        const response = await userService.register(req.body);
        return res.json(response);

    } catch (error) {
        return res.json(
            Response.internalServerError(error.message)
        );
    }
});

router.get(
    "/profile",
      authMiddleware,
      roleMiddleware("user"),
    async (req, res) => {
        console.log("req.makyawtUser : ", req.makyawtUser)

        try {
              const response =
                  await userService.profile(
                      req.makyawtUser.id
                  );

              return res.json(response);

        } catch (error) {

            return res.json(
                Response.internalServerError(error.message)
            );

        } s
    }
);


export default router;
