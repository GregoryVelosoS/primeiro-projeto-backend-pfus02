//Importação do módulo express
const express = require("express")

// Criando uma variável pra gerenciar as rotas de usuário
const roteador = express.Router()

// Importando tudo que tem no arquivo de controller do usuário
const userController = require("../controllers/userController")

//LOGIN
//Rota pra solicitar a página de login
roteador.get("/login", userController.formLogin)
//Rota pra enviar dados na página de login
roteador.post("/login", userController.loginUsuario)


// CRUD
//C = CRIAR NOVO USUÁRIO
//Rota pra solicitar a página de cadastro
roteador.get("/cadastrar", userController.formCadastro)
//Rota pra enviar dados de cadastro
roteador.post("/cadastrar", userController.salvarUsuario)

//R = OBTER INFORMAÇÕES DE USUÁRIOS
// Retorna as informações de todos os usuarios
roteador.get("/", userController.listarUsuarios)

// Retorna as informações de um usuário apenas
roteador.get("/:id", userController.buscarUsuario)

// U = ATUALIZAR UM USUÁRIO
roteador.post("/:id", userController.atualizarUsuario)

//D = DELETAR UM USUÁRIO
roteador.get("/:id", userController.deletarUsuario)

// Criando a exportação desse arquivo
module.exports = roteador
