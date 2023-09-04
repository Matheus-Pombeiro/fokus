const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");      // Obtém o span dentro do botão
const iniciarOuPausarImg = document.querySelector("#start-pause img");      // Obtém a img dentro do botão
const tempoNaTela = document.querySelector("#timer");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");                // Instancia um objeto do tipo Música
musica.loop = true;                                                     // Faz com que a musica (de 6 min) toque sem parar (loop)

const play = new Audio("sons/play.wav");
const pause = new Audio("sons/pause.mp3");
const beep = new Audio("sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;       // Declara e inicializa uma var para o temporizador (1500 = 25 min)
let intervaloId = null;

// ----------- Funções -----------

function alterarContexto(contexto) {

    mostrarTempo();

    botoes.forEach(function (contexto) {        // Percorre cada botão e retira a classe 'active'
        contexto.classList.remove("active");
    });

    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `imagens/${contexto}.png`);

    switch (contexto) {
        case ("foco"):

            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>
                `;

            break;

        case ("descanso-curto"):

            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                    <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `;

            break;

        case ("descanso-longo"):

            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `;

            break;

        default:

            break;
    }

};

const mostrarTempo = () => {

    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`;

};

const contagemRegressiva = () => {
    
    if (tempoDecorridoEmSegundos <= 0) {
        beep.play();
        alert("Tempo Finalizado!");
        zerar();
        return;
    }

    tempoDecorridoEmSegundos -= 1;

    mostrarTempo();

};

const iniciarOuPausar = () => {

    if (intervaloId) {
        pause.play();
        zerar();
        return;
    }

    play.play();

    intervaloId = setInterval(contagemRegressiva, 1000);
    
    iniciarOuPausarImg.src = "imagens/pause.png";
    iniciarOuPausarBt.textContent = "Pausar";

};

const zerar = () => {

    clearInterval(intervaloId);

    iniciarOuPausarImg.src = "imagens/play_arrow.png";
    iniciarOuPausarBt.textContent = "Começar"

    intervaloId = null;

};

// ----------- Eventos -----------

focoBt.addEventListener("click", () => {
    
    tempoDecorridoEmSegundos = 1500;        // (1500 = 25 min)
    alterarContexto("foco");
    focoBt.classList.add("active");

});

curtoBt.addEventListener("click", () => {
    
    tempoDecorridoEmSegundos = 300;         // (300 = 5 min)
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active");

});

longoBt.addEventListener("click", () => {
    
    tempoDecorridoEmSegundos = 900;         // (900 = 15 min)
    alterarContexto("descanso-longo");
    longoBt.classList.add("active");

});

musicaFocoInput.addEventListener("change", () => {

    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }

});

startPauseBt.addEventListener("click", iniciarOuPausar);

mostrarTempo();