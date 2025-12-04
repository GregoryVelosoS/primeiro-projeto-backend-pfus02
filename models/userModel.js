// Importar o json para servir como banco de dados
const db = require("../data/db.json");

// Variável pra armazenar os usuários vindos do db
let listaUsuarios = db.usuarios;

// ARÍA NOVA COM CONEZÃO AO BANDO DE DADUS 
// variável que importa a conexão com o banco
const conn = require("../config/conexao-banco")


module.exports = {
  // LOGIN
  // Função para validar o login
  login: (email, senha, callback) => {
    
    // Variável que guarda a consulta sql
    const sql = `SELECT * FROM usuarios
                 WHERE email = ?
                 AND   senha = ?`

   // Valores para consulta sql
   const valores = [ email,senha ]              

   // Função pra executar o sql, fazendo a requisição pro banco
   conn.query( sql, valores, (erro, resultados) => {
    //Se deu algum erro, retorna o erro para o controller
    if(erro){
       return callback(erro, null)
    }
    //Se deu certo, retorna o usuário se achou ou null se não achou
    callback(null, resultados[0] || null)
   }) 
  },



  //CRUD
  // Função para cadastrar um novo usuario
  salvar: ({ usuario, email, senha, tipo }, callback) => {
      // Variável que guarda a consulta sql
      const sql = `
        INSERT INTO usuarios (usuario, email, senha, tipo)
        VALUES ( ?, ?, ?, ?)
       `

      // Valores para consulta sql
      const valores = [ usuario, email, senha, tipo ] 

      // Função pra executar o sql, fazendo a requisição pro banco
      conn.query( sql, valores, (erro, resultados) => {
          if(erro){
            return callback(erro, null)
          }

          // Variável que armazena as informações que foram adicionadas no banco
          const novoUsuario = { id:resultados.insertId, usuario, email, senha, tipo }

          // Função que retorna pr controller
          callback(null, novoUsuario)
      })
  },

  // Busca todos os usuários do banco
  listarTodos: () => {
  },

  // Busca um usuário específico do banco
  buscarPorId: (id) => {
  },

  atualizar: (id, { usuario, email, senha, tipo }) => {
    
  },
  deletar: (id) => {
   
  },
};
