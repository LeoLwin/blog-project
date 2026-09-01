import { Router } from "express";
import * as authService from "../services/auth.service.js";
import * as Response from "../config/response.helper.js";

const router = Router();

router.post("/login", async (req, res) => {

  try {

      const response =
          await authService.login(req.body);


      return res.json(response);




  } catch (error) {




      return res.json(
          Response.internalServerError(error.message)
      );




  }




});




export default router;
