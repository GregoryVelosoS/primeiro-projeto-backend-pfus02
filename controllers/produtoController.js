const path = require("path");
const produtoModel = require("../models/produtoModel");

module.exports = {
  // ---------- CRUD ----------
  formCadastro: (req, res) => {
    res.render("produtos/cadastro", { titulo: "Cadastro" });
  },

  salvarProduto: (req, res) => {
    const { nome, descricao, categoria, preco, quantidade, imagemUrl } = req.body;
    const produtoNovo = produtoModel.salvar({
      nome,
      descricao,
      categoria,
      preco,
      quantidade,
      imagemUrl,
    });
    res.render("produtos/confirmacao", {
      tipo: "cadastro",
      titulo: "Cadastro Confirmado",
      produtoNovo,
    });
  },


};
