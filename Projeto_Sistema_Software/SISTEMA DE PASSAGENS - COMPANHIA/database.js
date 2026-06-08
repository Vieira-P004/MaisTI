const Database = require('better-sqlite3');
const db = new Database('sistema_passagens.db');

db.exec(`
    create table IF NOT EXISTS Companhia(
    idCompanhia INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    anoFundacao INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS trecho(
    idTrecho INTEGER PRIMARY KEY AUTOINCREMENT,
    idCompanhia INTEGER,
    origem TEXT NOT NULL,
    destino TEXT NOT NULL,
    valor REAL NOT NULL,
    numPassagens INTEGER NOT NULL,
    FOREIGN KEY (idCompanhia) REFERENCES Companhia(idCompanhia)
    );

    CREATE TABLE IF NOT EXISTS cupom(
    idCupom INTEGER PRIMARY KEY AUTOINCREMENT,
    idCompanhia INTEGER,
    codigo TEXT NOT NULL,
    percentualDesconto REAL NOT NULL,
    numeroCupons INTEGER NOT NULL,
    FOREIGN KEY (idCompanhia) REFERENCES Companhia(idCompanhia)
    );

    `); //SQL CRIAÇÃO DA TABELA