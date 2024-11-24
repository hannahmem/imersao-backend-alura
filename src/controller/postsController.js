import fs from "fs";
import { getTodosPosts, subirPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/serviceGemini.js"

export async function listarPosts(req, res) {
    const postsDoBanco = await getTodosPosts();
    // requisição e resposta
    res.status(200).json(postsDoBanco);
    // json pega um texto e converte para um formato que o JS consegue trabalhar.
}

export async function criarNovoPost(req, res) {
    // estamos criando uma função associada à rota, considerando que sempre chegará uma requisição e devolveremos uma resposta
    const novoPost = req.body;
    // toda requisição tem um cabeçalho, pra onde vão todas as informações das requisição, como seu tipo e para onde vai
    // a parte onde a gente envia dados vai no corpo da requisição (conteúdo)
    // isto fica disponível para nós através do req.body
    try {
        const postCriado = await subirPost(novoPost);
        // precisamos enviar para o banco o conteúdo que vai chegar no corpo da requisição, ou seja, o novoPost
        res.status(200).json(postCriado);

    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await subirPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.jpeg`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.jpeg`;
    try {
        // precisamos enviar para o banco o conteúdo que vai chegar no corpo da requisição, ou seja, o novoPost
        const imageBuffer = fs.readFileSync(`uploads/${id}.jpeg`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
            // Estamos montando um objeto que representa o nosso post com todos os dados que vieram da requisição
            // Tudo que vier do Postman ou do front, num eventual formulário, estaria aí preenchendo esse objeto para podermos colocá-lo no banco
        };
        const postCriado = await atualizarPost(id, postAtualizado);
        res.status(200).json(postCriado);

    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}