const prompt = require('prompt-sync')();
const db = require('./database');

// -------------------------------------------
// FUNÇÕES AUXILIARES
// -------------------------------------------

function pausar() {
    // pausa a execucao e limpa a tela
    console.log("\n-------------------------------------------");
    prompt("Pressione ENTER para continuar...");
    console.clear();
}

function listarCompanhias() {
    // busca todas as companhias no banco e exibe no terminal
    // retorna o array de companhias
    const companhias = db.prepare('SELECT * FROM Companhia').all(); //bucando todos os registros

    for(let i = 0; i < companhias.length;i++){
      return console.log(`[${companhias[i]}] ${companhias[i].nome}`)
    }

    return companhias;
}

function validarOuCadastrarCompanhia(idInformado) {
    // busca a companhia pelo id informado
    // se nao existir, pergunta se o usuario quer cadastrar uma nova
    // se sim, pede nome e ano de fundacao e insere no banco
    // retorna o id valido ou null se o usuario optar por nao cadastrar
    const Companhia = db.prepare('SELECT * FROM Companhia WHERE id = ?').get(idInformado);

    if(Companhia){
        return idInformado; 
    }

    console.log("\nNenhuma companhia cadastrada com esse ID.");
    const opcaoCadastro = prompt("Deseja cadastrar nova companhia? (1 = Sim ou 0 = Não)");

    if(opcaoCadastro != 1){
    return null;            
    }

    let nome = prompt("Digite o nome da companhia: ");
    let anoFundacao = parent(prompt("Digite o ano de fundação da companhia: "));

    const cadastrarCompanhia = db.prepare(`INSERT INTO Companhia (nome, anoFundacao) VALUES(?, ?)`).run(nome, anoFundacao);
    console.log(cadastrarCompanhia.lastInsertRowid);
    console.log(cadastrarCompanhia.changes);

    console.log("Companhia cadastrada com sucesso!");
    return cadastrarCompanhia.lastInsertRowid;
}

// -------------------------------------------
// FUNÇÕES DE TRECHOS
// -------------------------------------------

function cadastrarTrecho() {
    // lista as companhias, pede o id da companhia
    // valida ou cadastra a companhia
    // pede origem, destino, valor e numero de passagens
    // insere o trecho no banco
    listarCompanhias();
    const idCompanhia = parseInt(prompt('\nID da companhia responsável pelo trecho: '))
    const idValido = validarOuCadastrarCompanhia(idCompanhia);

    if(idValido === null){
        return null;
    }
    
    console.log('\n===========================================');
    console.log('             CADASTRANDO TRECHO             ');
    console.log('===========================================');
    const origem = prompt("Lugar de origem: ");
    const destino = prompt("Lugar de destino: ");
    const valor = parseFloat(prompt("Valor do trecho: R$ "));
    const numeroPassagens = parseInt(prompt("Número de passagens: "));

    db.prepare(`INSERT INTO trecho (idCompanhia, origem, destino, valor, numPassagens ) VALUES (?, ?, ?, ?, ?)`).run(idCompanhia, origem, destino, valor, numeroPassagens)

    console.log('\nTrecho cadastrado com sucesso!')
}

function listarTrechos() {
    // busca todos os trechos com JOIN na tabela Companhia
    // exibe os dados de cada trecho no terminal
    const trecho = db.prepare(`SELECT trecho. * , Companhia.nome AS nomeCompanhia
        FROM trecho
        JOIN companhia ON trecho.idCompanhia = companhia.id `).all();

    if(trecho.length === 0){
        console.log('\nNenhum trecho cadastrado.')
        return;
    }    

    console.log("\n======= 🗺️  TRECHOS =======");
    for(let i = 0; i< trecho.length; i++){
        const trechos = trecho[i];
        console.log(`\n[${trechos.id}] ${trechos.origem} -> ${trechos.destino}`);
        console.log(`Companhia: ${trechos.nomeCompanhia}`);
        console.log(`Valor: R$ ${trechos.valor.toFixed(2)}`);
        console.log(`Passagens disponiveís: ${trechos.numeroPassagens}`);
        console.log('-------------------------------------------------');
        
    }

}

function editarTrecho() {
    // lista os trechos, pede o id do trecho a editar
    // verifica se o trecho existe
    // pede os novos dados e atualiza no banco
    listarTrechos();
    const idTrecho = parseInt(prompt('\nID do trecho para editar: '));
    const trecho = db.prepare('SELECT * FROM trecho WHERE id = ?').get(idTrecho);

    if(!trecho){
        console.log('\nErro: Trecho não encontrado.');
        return;
    }

    const novaOrigem = prompt('Nova origem: ');
    const novoDestino = prompt('Novo destino: ');
    const novoValor = parseFloat(prompt('Novo valor: R$'));
    const novoNumeroPassagens = parseInt(prompt('Novo número de passagens: '));

    db.prepare('UPDATE trecho SET origem = ?, destino = ?, valor = ?, numeroPassagens = ? WHERE id = ?').run(novaOrigem, novoDestino, novoValor,novoNumeroPassagens, idTrecho);

    console.log('\nTrecho atualizado com sucesso!');
}

function excluirTrecho() {
    // lista os trechos, pede o id do trecho a excluir
    // verifica se o trecho existe
    // remove do banco
    listarTrechos();
    const idTrecho = parseInt(prompt('\nID do trecho para excluir: '));
    const trecho = db.prepare('SELECT * FROM trecho WHERE id = ?').get(idTrecho);

    if(!trecho){
        console.log('\nErro: Trecho não encontrado.');
        return;
    }

    db.prepare('DELETE FROM trecho WHERE id = ?').run(idTrecho);
    console.log('\nTrecho removido com sucesso!');
}

// -------------------------------------------
// FUNÇÕES DE CUPONS
// -------------------------------------------

function cadastrarCupom() {
    // lista as companhias, pede o id da companhia
    // valida ou cadastra a companhia
    // pede codigo, percentual de desconto e numero de cupons
    // insere o cupom no banco
    listarCompanhias();
    const idCompanhia = parseInt(prompt('\nID da companhia responsável pelo cupom: '));
    const idValido = validarOuCadastrarCompanhia(idCompanhia);

    if(idValido === null){
        return;
    }

    const codigo = prompt('Codigo do cupom(ex: VIAGEM10): ').toUpperCase();
    const percentualDesconto = parseFloat(prompt('Percentual de desconto (ex.: 10 para 10%):'));
    const numeroCupons = parseInt(prompt('Número de cupons disponiveis: '));

    db.prepare('INSERT INTO (idCompanhia, codigo, percentualDesconto, numeroCupons) VALUES(?, ?, ?, ?)').all(idValido, codigo, percentualDesconto, numeroCupons);

    console.log('\nCupom cadastrado com sucesso!');
}

function listarCupons() {
    // busca todos os cupons com JOIN na tabela Companhia
    // exibe os dados de cada cupom no terminal
    
}

function editarCupom() {
    // lista os cupons, pede o codigo do cupom a editar
    // verifica se o cupom existe
    // pede os novos dados e atualiza no banco
}

function excluirCupom() {
    // lista os cupons, pede o codigo do cupom a excluir
    // verifica se o cupom existe
    // remove do banco
}

// -------------------------------------------
// MENU PRINCIPAL
// -------------------------------------------

let opcao = -1;

console.clear();
console.log('\n===========================================');
console.log('   SISTEMA DE PASSAGENS - COMPANHIA        ');
console.log('===========================================');
listarCompanhias();

while (opcao !== 0) {
    console.log('\n---- MENU ----');
    console.log('1 - Gerenciar Trechos');
    console.log('2 - Gerenciar Cupons');
    console.log('0 - Sair');
    console.log('-------------------------\n');

    opcao = parseInt(prompt('Escolha uma opcao: '));

    switch (opcao) {

        case 1:
            console.log('\n---- TRECHOS ----');
            console.log('1 - Cadastrar');
            console.log('2 - Listar');
            console.log('3 - Editar');
            console.log('4 - Excluir');
            const opcaoTrecho = parseInt(prompt('Escolha: '));

            switch (opcaoTrecho) {
                case 1:
                    let idInformado = parseInt("Informe o Id: ");
                     cadastrarTrecho(); 
                break;
                case 2: listarTrechos(); break;
                case 3: editarTrecho(); break;
                case 4: excluirTrecho(); break;
                default: console.log('\nOpcao invalida.'); break;
            }
            pausar();
            break;

        case 2:
            console.log('\n---- CUPONS ----');
            console.log('1 - Cadastrar');
            console.log('2 - Listar');
            console.log('3 - Editar');
            console.log('4 - Excluir');
            const opcaoCupom = parseInt(prompt('Escolha: '));

            switch (opcaoCupom) {
                case 1: cadastrarCupom(); break;
                case 2: listarCupons(); break;
                case 3: editarCupom(); break;
                case 4: excluirCupom(); break;
                default: console.log('\nOpcao invalida.'); break;
            }
            pausar();
            break;

        case 0:
            console.log('\nFinalizando o sistema... Ate logo!\n');
            break;

        default:
            console.log('\nOpcao invalida! Tente novamente.');
            pausar();
            break;
    }
}nomeCompanhia