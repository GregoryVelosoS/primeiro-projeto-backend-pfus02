const path = require("path");
const produtoModel = require("../models/produtoModel");

module.exports = {
  // ---------- CRUD ----------
  formCadastro: (req, res) => {
    res.render("produtos/cadastroProdutos", { titulo: "Cadastro" });
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
    res.render("produtos/confirmacaoProdutos", {
      tipo: "cadastro",
      titulo: "Cadastro Confirmado",
      produtoNovo,
    });
  },

 listarProdutos: (req, res) => {
    const produtos = produtoModel.listarTodos();
    // res.json(produtos);
    res.render("produtos/listaProdutos", {
      titulo: "Lista de produtos",
      produtos,
    });
  },
};
