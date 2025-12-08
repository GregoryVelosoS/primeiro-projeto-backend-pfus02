// Importa tudo que tem no model
const userModel = require("../models/userModel");

module.exports = {
  // LOGIN
  // REsponde a requisição mostrando a visualização da tela de login
  formLogin: (req, res) => {
    res.render("login", { titulo: "Login" });
  },

  // Função para levar os dados preenchidos para o model realizar o login
  loginUsuario: (req, res) => {
    // Cria um objeto com as informações do body, retirados dos inputs
    const { email, senha } = req.body;
    // Manda as informações do objeto para o model
    userModel.login(email, senha, (erro, logado) => {
      if (erro) {
        return res.render("login", {
          titulo: "Login errado",
          erro: "erro no servidor",
        });
      }
      // Se não conseguiu logar, manda uma mensagem de erro
      if (!logado) {
        res.render("login", {
          titulo: "Login errado",
          erro: "Email ou senha inválidos",
        });
      }
      // Se conseguiu manda uma mensagem de confirmação
      else {
        res.status(200);
        res.render("index", { titulo: "Bem vindo", usuario: logado.nome });
      }
    });
  },

  // CRUD

  //C
  formCadastro: (req,res) => {
    // Renderiza a pagina de cadastro
    res.render("usuarios/cadastro", {titulo: "Cadastro"})
  },

  salvarUsuario: (req,res) =>{
    // Criar um objeto com as informações da view
    const { usuario, email, senha, tipo } = req.body

    // manda as informações pro model
    userModel.salvar({ usuario, email, senha, tipo }, (erro, usuarioNovo) => {
      // Se deu erro, renderiza a página de erro, mostrando a mensagem do erro
      if(erro){
        return res.status(500).render("usuarios/erroUsuario", {
            titulo:"Erro",
            mensagem: "Erro ao salvar o usuário"
          }
        )
      }

      // Se deu certo, renderiza a página de confirmação
      res.render("usuarios/confirmacao", {
          titulo:"Cadastro confirmado",
          tipo: "cadastro",
          usuarioNovo
      })
    })
  },

  // R
  listarUsuarios: (req,res) => {
    // acessar o model, e resgatar as informações
    userModel.listarTodos( (erro, usuarios) => {
    // Se deu erro, renderiza a página de erro, mostrando a mensagem do erro
      if(erro){
        return res.status(500).render("usuarios/erroUsuario", {
            titulo:"Erro",
            mensagem: "Erro ao listar os usuários"
          }
        )
      }

    // Se deu certo, renderiza a página de lista de usuários
    res.render("usuarios/listaUsuarios", {
      titulo:" Lista de usuários",
      usuarios
    })  
    })
  },

  //U
  buscarUsuario: () => {
  },
  atualizarUsuario: () => {
  },

  // D
  deletarUsuario: () => {
  }
}