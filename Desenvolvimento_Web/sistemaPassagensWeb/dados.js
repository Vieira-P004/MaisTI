//AQUI VAI ARMAZENAR OS DADOS DO SISTEMA
class Companhia {
    constructor(nome){
        this.nome = nome;
        this.trechos = []
    }
}

const companhias = [];

class Trecho {
    constructor(idCompanhia, origem, destino, valor){
        this.idCompanhia = idCompanhia;
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
    }
}

const trechos = [];