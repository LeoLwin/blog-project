import { Router } from "express";
import * as blogService from "../services/blog.service.js";
import * as Response from "../config/response.helper.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        console.log("call get/");

        // get list form redis with key name  : list
        // if (list) {return res.json(list)}

        const response = await blogService.getBlogs();
        // store in redis key name = list : response
        console.log("Response : ", response)
        return res.json(response);
    } catch (error) {
        return res.json(
            Response.internalServerError(error.message)
        );
    }
});

router.get("/:id", async (req, res) => {
    try {
        console.log("Param Data : ", req.params.id);
        const response = await blogService.getBlogById(req.params.id);
        return res.json(response);
    } catch (error) {
        return res.json(
            Response.internalServerError(error.message)
        );
    }
});


router.post("/", upload.single("profile"), async (req, res) => {
    try {
        console.log("req.body : ", req.body);
        console.log("req.file : ", req.file);

        const payload = {


               title: req.body.title,


               content: req.body.content,


               image: req.file
                   ? req.file.path
                   : null

           };

        const response = await blogService.createBlog(payload);
        // if(response.code === 200) { clear redis cache in ram key name : list }
        console.log("Response : ", response)
        return res.json(response);
    } catch (error) {
        return res.json(
            Response.internalServerError(error.message)
        );
    }
});

router.put("/:id", async (req, res) => {
    try {
        const response = await blogService.updateBlog(
            req.params.id,
            req.body
        );
        // if(response.code === 200) { clear redis cache in ram key name : list }

        return res.json(response);
    } catch (error) {
        return res.json(
            Response.internalServerError(error.message)
        );
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await blogService.deleteBlog(req.params.id);
        return res.json(response);
    } catch (error) {
        return res.json(
            Response.internalServerError(error.message)
        );
    }
});

export default router;




