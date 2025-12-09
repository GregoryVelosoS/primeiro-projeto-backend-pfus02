// Importa a conexão com o banco de dados
const conn = require("../config/conexao-banco.js");

module.exports = {
  // Login
  login: (email, senha, callback) => {
    // Váriável sql que guarda a consulta desejada
    const sql = ` 
      SELECT * FROM usuarios
      WHERE email = ?
      AND senha = ? `;

    // Valores que serão utilizados na consulta
    const valores = [email, senha];

    // Executar o comando no banco
    conn.query(sql, valores, (erro, resultados) => {
      // Lidar com o erro
      if (erro) {
        return callback(erro, null);
      }

      // Retornar um resultado para o controller
      callback(null, resultados[0] || null);
    });
  },

  // Criar = CREATE
  salvar: ({ usuario, email, senha, tipo }, callback) => {
    // Váriável sql que guarda a consulta desejada
    const sql = `
      INSERT INTO usuarios (usuario, email, senha, tipo)
      VALUES (?, ?, ?, ?)
    `;

    // Valores que serão utilizados na consulta
    const valores = [usuario, email, senha, tipo];

    // Executar o comando no banco
    conn.query(sql, valores, (erro, resultado) => {
      // Lidar com o erro
      if (erro) {
        return callback(erro, null);
      }

      // Objeto com as informações que o usuário inseriu no banco
      const novoUsuario = {
        id: resultado.insertId,
        usuario,
        email,
        senha,
        tipo,
      };

      callback(null, novoUsuario);
    });
  },

  // Listar = READ
  listarTodos: (callback) => {
    // Váriável sql que guarda a consulta desejada
    const sql = `SELECT * FROM usuarios`;

    // Executar o comando no banco
    conn.query(sql, (erro, resultados) => {
      if (erro) {
        return callback(erro, null);
      }

      callback(null, resultados);
    });
  },

  // Atualizar = UPDEITI
  // Buscar o usuário
  buscarPorId: (id, callback) => {
    // Váriável sql que guarda a consulta desejada
    const sql = `
        SELECT * FROM usuarios
        WHERE id = ?`

    // Variável com informação oculta/misteriosa
    const valor = [id]

    // Executar o comando no banco
    conn.query(sql, valor, (erro, resultados) => {
      if (erro) {
        return callback(erro, null);
      }

      callback(null, resultados[0] || null)
    })
  },
  // Atualizar informações
  atualizar: (id, { usuario, email, senha, tipo }, callback) => {
    // Váriável sql que guarda a consulta desejada
    const sql = `
      UPDATE usuarios
      SET usuario = ?, email = ?, senha = ?, tipo = ?
      WHERE id = ? `
    
    // Variável com informação oculta/misteriosa
    const valores = [usuario, email, senha, tipo, id]
    
    // criar um objeto, pra retornar pro usuario
    const atualizado = {
      usuario: valores[0]
    } 
    // Executar o comando no banco
    conn.query(sql, valores, (erro, resultado) => {
      if (erro) {
        return callback(erro, null);
      }

      callback(null, atualizado);
    });
  },

  // Excluir =  DELETAR
  deletar: (id, callback) => {
    // Váriável sql que guarda a consulta desejada
    const sql = `DELETE FROM usuarios
                 WHERE id = ? `;

    // Variável com informação oculta/misteriosa
    const valor = [id];

    // Executar o comando no banco
    conn.query(sql, valor, (erro, resultado) => {
      if (erro) {
        return callback(erro, null);
      }

      callback(null, resultado.affectedRows > 0);
    });
  },
};
