// --- ELEMENTOS DO HTML ---

const chatForm = document.querySelector(".chat-form");
const messageInput = document.querySelector("#message-input");
const chatMessages = document.querySelector(".chat-messages");


// --- MEMÓRIA DO AGENT ---

let problemaAtual = null;
let etapaAtual = null;
let erroAtual = null;


// --- IDENTIFICAR O PROBLEMA ---

function identificarProblema(message) {

    const messageLower = message.toLowerCase();

    if (messageLower.includes("adobe")) {

        return "adobe";

    } else if (messageLower.includes("internet")) {

        return "internet";

    } else if (messageLower.includes("senha")) {

        return "senha";

    } else {

        return "desconhecido";

    }

}


// --- FERRAMENTAS DO AGENT ---

function diagnosticarAdobe() {

    // O Agent agora sabe que está esperando
    // o usuário informar qual erro apareceu.

    etapaAtual = "aguardando_erro";

    return "Vamos diagnosticar o Adobe. Primeiro, me diga: aparece alguma mensagem ou código de erro durante a instalação?";

}


function diagnosticarInternet() {

    return "Vamos diagnosticar sua conexão. Primeiro, me diga: o computador está conectado por Wi-Fi ou cabo de rede?";

}


function diagnosticarSenha() {

    return "Vamos verificar o problema de acesso. Você esqueceu a senha ou a senha está sendo recusada mesmo estando correta?";

}


// --- GERAR RESPOSTA ---

function gerarResposta(problema) {

    if (problema === "adobe") {

        return diagnosticarAdobe();

    } else if (problema === "internet") {

        return diagnosticarInternet();

    } else if (problema === "senha") {

        return diagnosticarSenha();

    } else {

        return "Não consegui identificar o problema. Pode me dar mais detalhes?";

    }

}


// --- ENVIO DA MENSAGEM ---

chatForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const message = messageInput.value.trim();


    // --- VERIFICAR SE A MENSAGEM ESTÁ VAZIA ---

    if (message === "") {

        return;

    }


    // --- CRIAR MENSAGEM DO USUÁRIO ---

    const messageElement = document.createElement("div");

    messageElement.classList.add("message", "user");

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);


    // --- LIMPAR CAMPO ---

    messageInput.value = "";


    // --- CRIAR MENSAGEM DO AGENT ---

    const agentMessage = document.createElement("div");

    agentMessage.classList.add("message", "agent");


    // --- IDENTIFICAR O PROBLEMA ---

    const problema = identificarProblema(message);


    // --- MEMORIZAR O PROBLEMA ---

    if (problema !== "desconhecido") {

        problemaAtual = problema;

    }


// --- DECIDIR O QUE O AGENT DEVE FAZER ---

let resposta;

if (
    problemaAtual === "adobe" &&
    etapaAtual === "aguardando_erro" &&
    problema === "desconhecido"
) {

    // Guarda o erro informado
    erroAtual = message;

    // Agora o Agent espera saber a origem da instalação
    etapaAtual = "aguardando_origem_instalacao";

    resposta =
        "Entendi. O erro informado foi: " +
        erroAtual +
        ". A instalação está sendo feita pelo Company Portal ou por um instalador manual?";

} else if (
    problemaAtual === "adobe" &&
    etapaAtual === "aguardando_origem_instalacao"
) {

    resposta =
        "Entendi. A instalação está sendo feita por: " +
        message +
        ".";

    etapaAtual = "origem_recebida";

} else {

    resposta = gerarResposta(problema);

}

    // --- COLOCAR A RESPOSTA NA MENSAGEM ---

    agentMessage.textContent = resposta;


    // --- MOSTRAR RESPOSTA DO AGENT ---

    chatMessages.appendChild(agentMessage);

});