// Questions du questionnaire
const questions = [
    {
        question: "Quel est le code pour ouvrir la première porte ?",
        options: ["1234", "4321", "0000", "2468"],
        correct: ["4321"]
    },
    {
        question: "Choisissez les objets utiles pour vous évader :",
        options: ["Clé", "Carte magnétique", "Chocolat", "Télécommande"],
        correct: ["Clé", "Carte magnétique"],
        multiple: true
    },
    {
        question: "Quel est le nom du gardien ?",
        options: ["Martin", "Durand", "Lemoine", "Pascal"],
        correct: ["Lemoine"]
    }
];

let currentQuestionIndex = 0;

function afficherQuestion() {
    const container = document.getElementById("questionnaire");
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-button");

    const question = questions[currentQuestionIndex];
    if (!question) return;

    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = question.multiple ? "checkbox" : "radio";
        input.name = "option";
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + option));
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement("br"));
    });

    nextButton.style.display = "block";
}

document.getElementById("next-button").addEventListener("click", () => {
    const inputs = document.querySelectorAll("#options-container input");
    const selected = Array.from(inputs)
        .filter(input => input.checked)
        .map(input => input.value);

    const question = questions[currentQuestionIndex];
    const correct = question.correct.sort().toString();
    const selectedStr = selected.sort().toString();

    if (correct !== selectedStr) {
        afficherMessageErreur("Réponse incorrecte. Essayez encore !");
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        afficherQuestion();
    } else {
        document.getElementById("questionnaire").innerHTML = "<h3>Bravo ! Vous avez terminé !</h3>";
    }
});

// Timer
function startCountdown(durationInMinutes) {
    const timerElement = document.getElementById("timer");
    let timeLeft = durationInMinutes * 60;

    const countdownInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timerElement.textContent = `⏳ Temps restant : ${formattedTime} ⏳`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerElement.textContent = "⏳ Temps écoulé ⏳!";
            afficherMessageErreur("Temps écoulé. Vous n’avez pas réussi à vous évader à temps...");
        }

        timeLeft--;
    }, 1000);
}

// Message d'erreur
function afficherMessageErreur(message) {
    let erreurDiv = document.createElement("div");
    erreurDiv.className = "erreur-fullscreen";
    erreurDiv.innerHTML = `
        <div class="erreur-content">
            <p>${message}</p>
            <button onclick="fermerMessageErreur()">RETOUR</button>
        </div>
    `;
    document.body.appendChild(erreurDiv);
}

function fermerMessageErreur() {
    let erreurDiv = document.querySelector(".erreur-fullscreen");
    if (erreurDiv) {
        erreurDiv.remove();
    }
}

// Lancer tout au chargement
window.onload = function () {
    startCountdown(20); // durée en minutes
    afficherQuestion();
};