const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");


// CRUD
// C
router.get("/cadastrar", produtoController.formCadastro);
router.post("/cadastrar", produtoController.salvarProduto);

// R
router.get("/", produtoController.listarProdutos);       

module.exports = router;