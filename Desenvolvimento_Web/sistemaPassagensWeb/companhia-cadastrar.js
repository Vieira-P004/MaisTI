const inputNome = document.getElementById('nomeCompanhia');
const btnCadastrar = document.getElementById('btnCadastrar');
const mensagem = document.getElementById('mensagem');

const cadastrarCompanhia = () => {
    // value -> Pega o valor digitado no input
    // trim -> Retira os espaços colocado na string
        const nome = inputNome.value.trim();

    if(nome === ""){
        mensagem.textContent = "Digite o nome da companhia."
        return;
    }

    const companhia = new Companhia(nome)

    companhias.push(companhia);

    mensagem.textContent = "Companhia cadastrada com sucesso!"

    inputNome.value = "";
    inputNome.focus();

    console.log(companhias)
    
};

btnCadastrar.addEventListener('click', cadastrarCompanhia)