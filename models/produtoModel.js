const db = require("../db/db.json");

let produtos = db.produtos;

module.exports = {

  // CREATE
  salvar: ({ nome, descricao, categoria, preco, quantidade, imagemUrl}) => {
    const novoProduto = {
      id: produtos.length + 1,
      nome,
      descricao,
      categoria,
      preco,
      quantidade,
      imagemUrl,
    };
    produtos.push(novoProduto);
    console.log("Produto salvo:", novoProduto);
    return novoProduto;
  },
};
