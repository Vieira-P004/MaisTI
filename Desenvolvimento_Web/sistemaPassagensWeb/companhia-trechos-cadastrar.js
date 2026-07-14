const selectCompanhia = document.getElementById('companhia')
const inputOrigem = document.getElementById('origem');
const inputDestino = document.getElementById('destino');
const inputValor = document.getElementById('valor');
const btnCadTrecho = document.getElementById('btnCadTrecho');
const mensagemTrecho = document.getElementById('mensagemTrecho');

const cadastrarTrecho = () => {

    const idCompanhia = Number(selectCompanhia.value);
    const origem = inputOrigem.value.trim();
    const destino = inputDestino.value.trim();
    const valor = Number(inputValor.value);

    if(origem === "" || destino === "" || valor <= 0){
        mensagemTrecho.textContent = "Preencha todos os campos"
        return;
    }

    const trecho = new Trecho(
        idCompanhia,
        origem,
        destino,
        valor
    )

    trechos.push(trecho)

    mensagemTrecho.textContent = "Trecho cadastrado com sucesso"

    console.log(trechos);


};

btnCadTrecho.addEventListener('click', cadastrarTrecho);
