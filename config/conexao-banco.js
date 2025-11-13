const mysql = require("mysql2")

// Criar uma variável para conexão com o banco
const conn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "supermercado",
    user: "root",
    password: "usbw"
})

// Conecta ao banco de dados, ou tenta pelo menos
conn.connect( (erro) => {
    if(erro){
        console.log(erro)
    }
    else{
        console.log("Conectado com sucesso");
    }
})

module.exports = conn;