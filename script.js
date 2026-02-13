const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const heartsContainer = document.getElementById("hearts-container");

let yesScale = 1;
let noScale = 1;

const frasesNo = [
    "¿Seguraaa? 🥺",
    "Piénsalo otra vez 😳",
    "Error 404: opción inválida 💔",
    "¡Vamos, elige Sí! 💘",
    "No puedes escapar 😏"
];

function mostrarFraseNo() {
    const frase = frasesNo[Math.floor(Math.random() * frasesNo.length)];
    const originalText = noBtn.innerText;
    noBtn.innerText = frase;

    if (!frase.includes("Error 404")) {
        setTimeout(() => { noBtn.innerText = originalText; }, 2000);
    } else {
        mostrarWarning("Error 404: opción inválida 💔");
        setTimeout(() => { noBtn.innerText = originalText; }, 2000);
    }
}

function mostrarWarning(mensaje) {
    const warning = document.createElement("div");
    warning.className = "warning-popup";
    warning.innerText = mensaje;
    document.body.appendChild(warning);
    setTimeout(() => warning.remove(), 2000);
}

function growYesButton() {
    yesScale += 0.1;
    yesBtn.style.transform = `scale(${yesScale})`;
}

function shrinkNoButton() {
    noScale -= 0.05;
    if (noScale < 0.6) noScale = 0.6;
    noBtn.style.transform = `scale(${noScale})`;
}

function moveNoButtonRandomly() {
    const container = document.querySelector(".buttons-container");
    const rect = container.getBoundingClientRect();
    const maxX = rect.width - noBtn.offsetWidth;
    const maxY = rect.height - noBtn.offsetHeight;
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";
}

function crearCorazon() {
    const heart = document.createElement("div");
    heart.className = "heart";
    const size = Math.random() * 20 + 10;
    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(crearCorazon, 300);

function handleNoInteraction(event) {
    event.preventDefault();
    growYesButton();
    shrinkNoButton();
    moveNoButtonRandomly();
    mostrarFraseNo();
}
noBtn.addEventListener("mouseover", handleNoInteraction);
noBtn.addEventListener("click", handleNoInteraction);

function showDeliveryProcess() {
    document.body.innerHTML = `
        <div class="teleport-question">
            <h1>Iniciando entrega de tu Valentín 💌</h1>
            <div class="teleport-loading">
                <div class="phase-text" id="phaseText">Mensajero en camino...</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
            <div class="delivery-car" id="deliveryCar"></div>
            <div class="final-message" id="finalMessage"></div>
        </div>
        <div id="hearts-container"></div>
    `;

    const progressFill = document.getElementById("progressFill");
    const phaseText = document.getElementById("phaseText");
    const deliveryCar = document.getElementById("deliveryCar");
    const finalMessage = document.getElementById("finalMessage");
    const heartsContainerNew = document.getElementById("hearts-container");

    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        const size = Math.random() * 20 + 10;
        heart.style.width = size + "px";
        heart.style.height = size + "px";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
        heartsContainerNew.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);

    let progress = 0;
    const phases = [
        "Mensajero en camino...",
        "Obteniendo tu ubicación...",
        "Preparando entrega..."
    ];
    let phaseIndex = 0;

    const interval = setInterval(() => {
        progress += 2;
        if (progress > 100) progress = 100;
        progressFill.style.width = progress + "%";

        if (progress >= (phaseIndex + 1) * 33 && phaseIndex < phases.length - 1) {
            phaseIndex++;
            phaseText.innerText = phases[phaseIndex];
        }

        if (progress >= 100) {
            clearInterval(interval);
            phaseText.innerText = "";
            showFinalMessage(finalMessage);
            launchDeliveryAnimation(deliveryCar, heartsContainerNew);
        }
    }, 100);
}

function showFinalMessage(finalMessage) {
    finalMessage.innerText = "Tu Valentín está en proceso de entrega 💌, te llamaremos cuando estemos en tu ubicación. No cierres esta pestaña hasta que tu Valentín haya sido entregado";
    setTimeout(() => { finalMessage.style.opacity = 1; }, 100);
}

function launchDeliveryAnimation(deliveryCar, heartsContainerNew) {
    // centro de pantalla para la explosión
    const centerX = window.innerWidth / 2;

    // Crear explosión de corazones al finalizar la entrega
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "delivery-heart";
            heart.style.left = centerX + Math.random() * 60 - 30 + "px";
            heart.style.top = deliveryCar.offsetTop + Math.random() * 20 - 10 + "px";
            heartsContainerNew.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }, i * 30);
    }
}


yesBtn.addEventListener("click", showDeliveryProcess);
