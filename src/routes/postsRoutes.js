import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, criarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// programa para que o multer consiga rodar no windows
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage })

const routes = (app) => {
    app.use(express.json());
    // Rota para buscar todos os posts
    app.use(cors(corsOptions));
    app.get("/posts", listarPosts);
    // Rota para criar um post
    app.post("/posts", criarNovoPost);
    // cria uma função que vai ser disparada quando a rota for atingida
    app.post("/upload", upload.single("imagem"), uploadImagem);
    
    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;