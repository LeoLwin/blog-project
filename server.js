import express from "express";
import indexController from "./controller/index.controller.js";
import path from 'path';


const app = express();

app.use(express.json());



app.get("/test", (req, res) => {
    res.json('Blog API is working fine');
});



app.use("/api", indexController);

app.use('/static', express.static(path.join(import.meta.dirname)));

const PORT = 5000;


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

