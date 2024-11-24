import express from "express"
import routes from "./src/routes/postsRoutes.js";
// import conectarAoBanco from "./src/config/dbconfig.js";
// const posts = [
//     {
//         id: 1,
//         descricao: "Uma foto teste",
//         imagem: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 2,
//         descricao: "Gatinho fofinho",
//         imagem: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 3,
//         descricao: "Paisagem deslumbrante",
//         imagem: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 4,
//         descricao: "Cachorro fofo",
//         imagem: "https://placecats.com/millie/300/150"
//     }
//     // colocar um id permite acessar um deles
// ];

const app = express();
app.use(express.static("uploads"));
// servir arquivos estáticos: tudo que tiver dentro dessa pasta, vamos abrir para ser acessado e ser servido
routes(app);
// app.use(express.json());
// servidor devolve json para as pessoas, converte essa estrutura em json
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
// 3000 é uma porta -> servidor local -> padrão 
// Transformamos nosso computador em um servidor e usamos umas das portas do nosso computador, para permitir que quem quiser acessar algo do servidor, possa entrar.
// criar uma rota e definir a resposta que precisamos dar



