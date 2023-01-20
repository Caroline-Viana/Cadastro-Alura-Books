// O método fetch () é assíncrono e tem como parâmetro obrigatório a URL da API
// O fetch devolve uma promessa de que algo será retornado, essa promessa é chamada de Promisse. Essa promessa pode tanto ser boa, ter retornado os dados, quanto ter falhado por algum motivo.
// then() quer dizer 'então', basicamente ele pega a resposta do método anterior e fala 'então faça isso (e passa oq é para fazer no parênteses) 
// .json() organiza os dados de uma forma mais entendivel 
// .catch() em português significa "pegue". Assim, caso aconteça algum erro, ele pega o erro e imprime na tela.
// throw Error é usado para fazer mensagens de erro customizadas
// .finally () independente da resposta tudo oq tiver dentro dele vai ocorrer

/*var consultaCEP = fetch('https://viacep.com.br/ws/01001250/json/')
.then(resposta => resposta.json())
.then(r => {
    if (r.erro) {
        throw Error('Esse cep não existe!')
    }else {
        console.log(r)}
    })
.catch(erro => console.log(erro))
.finally(mensagem => console.log('Processamento concluído!'));

console.log(consultaCEP);*/

//----------------------------------------------------------------//

// A declaração async function define uma função assíncrona e o operador await é utilizado para esperar por uma Promise.
//o async/await faz o processamento de forma sequencial, Promises com .then() são processadas em paralelo
async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP nã existente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro){
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}
// focusout é quando o cursor clica fora da área que antes estava selecionada
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value))

// Promise.all resolve todas as promises
/*let ceps = ['01001000', '01001001'];
let conjuntosCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntosCeps).then(respostas => console.log(respostas));*/
