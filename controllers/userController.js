// Importa o módulo de path pra saber as pastas e arquivos do projeto
const path = require("path");

// Importa tudo que tem no model
const userModel = require("../models/userModel");

module.exports = {
  // LOGIN
  // REsponde a requisição mostrando a visualização da tela de login
  formLogin: (req, res) => {
    res.render("login", { titulo: "Login"});
  },

  // Função para levar os dados preenchidos para o model realizar o login
  loginUsuario: (req, res) => {
    // Cria um objeto com as informações do body, retirados dos inputs
    const { email, senha } = req.body;
    // Manda as informações do objeto para o model
    const logado = userModel.login(email, senha);

    // Se não conseguiu logar, manda uma mensagem de erro
    if (!logado) {
      // return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
      res.status(401)
      res.render("login", {titulo: "Login errado", erro:"Email ou senha inválidos"})
    }
    // Se conseguiu manda uma mensagem de confirmação
    else {
      // res.json({ mensagem: "Login realizado" });
      res.status(200)
      res.render("index", { titulo: "Bem vindo", usuario: logado.nome})
    }
  },

  // CRUD
  // C
  // Responde a requisição mostrando a visualização da tela de cadastro
  formCadastro: (req, res) => {
    res.render("usuarios/cadastroUsuarios", { titulo: "Cadastro"});
  },

  // Função para levar os dados preenchidos para o model realizar o cadastro
  salvarUsuario: (req, res) => {
    const { usuario, email, senha, tipo } = req.body;
    usuarioNovo = userModel.salvar({ usuario, email, senha, tipo });
    res.render("usuarios/confirmacaoUsuarios", {
      tipo: "cadastro",
      titulo: "Cadastro confirmado",
      usuarioNovo
    });
  },

  // R
  // Função para mostrar todos os usuarios
  listarUsuarios: (req, res) => {
    const usuarios = userModel.listarTodos();
    res.json(usuarios);
    // res.render("usuarios", { usuarios });
  },
  // Função para mostrar apenas um usuario
  buscarUsuario: (req, res) => {
    // Busca o id vindo da url como parametro
    const id = req.params.id;
    // Guarda o usuário retornado, depois de buscar pelo model
    const usuario = userModel.buscarPorId(id);
    // Se não achar, avisa que deu erro
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    // se achar, devolve as informações via json
    res.json(usuario);
  },
  // Função para atualizar informações de um usuário
  atualizarUsuario: (req, res) => {
    // Busca o id vindo da url como parametro
    const id = req.params.id;
    // Busca as novas informações para atualizar
    const { usuario, email, senha } = req.body;
    //Guarda o usuário atualizado em uma variável
    const usuarioAtualizado = userModel.atualizar(id, {
      usuario,
      email,
      senha,
    });

    // Se não achar, avisa que deu erro
    if (!usuarioAtualizado) {
      return res.status(404).json({
        usuarioAtualizado: usuarioAtualizado,
        mensagem: "Usuário não encontrado",
      });
    }
    // se atualizar, manda uma mensagem dizendo que deu certo
    res.json({ mensagem: "Usuário foi atualizado" });
  },
  // Função para deletar um usuário
  deletarUsuario: (req, res) => {
    // Busca o id vindo da url como parametro
    const id = req.params.id;
    //Guarda o usuário deletado em uma variável
    const deletado = userModel.deletar(id);

    // Se não achar, avisa que deu erro
    if (!deletado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    // se atualizar, manda uma mensagem dizendo que deu certo
    res.json({ deletado: deletado, mensagem: "Usuário foi deletado" });
  },
};
