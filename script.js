// --- ELEMENTOS DO HTML ---

const chatForm = document.querySelector(".chat-form");
const messageInput = document.querySelector("#message-input");
const chatMessages = document.querySelector(".chat-messages");


// --- MEMÓRIA DO AGENT ---

let problemaAtual = null;


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


    // --- CRIAR RESPOSTA DO AGENT ---

    const agentMessage = document.createElement("div");

    agentMessage.classList.add("message", "agent");


    // --- IDENTIFICAR E MEMORIZAR O PROBLEMA ---

    const problema = identificarProblema(message);

    if (problema !== "desconhecido") {
        problemaAtual = problema;
    }


    // --- PEDIR RESPOSTA AO AGENT ---

    let resposta;

    if (problema === "desconhecido" && problemaAtual !== null) {

        resposta =
            "Entendi. Continuamos falando do problema de " +
            problemaAtual +
            ".";

    } else {

        resposta = gerarResposta(problema);

    }

    agentMessage.textContent = resposta;


    // --- MOSTRAR RESPOSTA DO AGENT ---

    chatMessages.appendChild(agentMessage);

});