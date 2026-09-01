import { Router } from "express";
import  blog from "./blog.controller.js";
import user from "./user.controller.js";
import auth from "./auth.controller.js";
const router = Router();

router.get("/index",(req,res)=>{
    res.json('Index API is working fine');
})
router.use("/blogs", blog);
router.use("/users",user);
router.use("/auth",auth);
export default router;
