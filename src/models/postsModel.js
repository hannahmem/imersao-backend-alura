import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    // criação de objetos para representar o banco e a coleção
    return colecao.find().toArray();
}
// export default -> usado só quando só temos uma função no arquivo a ser exportado

export async function subirPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const objID = ObjectId.createFromHexString(id);
    // criamos isso para guardar, nesse objeto especial que o Mongo obriga a gente a usar, o id do post que queremos atualizar
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
    // set -> diz que estamos mandando um conjunto de dados para atualizar naquele post
    // Objetivo: atualizar um post específico que a gente fez
    // updateOne pede o ID que queremos atualizar e com quais dados
}
