// Questions du questionnaire

const questions = [

    {

        question: "Le poisson a attendu 3 heures sur la ligne de production",

        options: ["Les bactéries se sont développées ", "Ce n’est pas grave, le surgélateur va le surgeler ensuite", "Un retour en stock aurait dû être fait dès le début de la panne", "Il faut détruire toutes les matières qui ont dégelées lors de la panne"],

        correct: ["Les bactéries se sont développées ", "Un retour en stock aurait dû être fait dès le début de la panne", "Il faut détruire toutes les matières qui ont dégelées lors de la panne"],

        multiple: true

    },

    {

        question: "La sauce a attendu 3 heures dans le bas tampon à une température estimée à 60°C",

        options: ["Les bactéries se sont développées ", "La température reste correcte mais il faut refaire un CCP de cuisson", "La sauce a décanté mais je dose quand même ", "La sauce doit être mise en PSO"],

        correct: ["La température reste correcte mais il faut refaire un CCP de cuisson", "La sauce doit être mise en PSO"],

        multiple: true

    },

    {

        question: "Le mécanicien est venu de dehors sans se laver les mains",

        options: ["Il a eu raison car la panne était urgente", "Il a eu raison car il ne touche pas la matière", "Il a eu raison puisqu’il va les salir en manipulant la machine", "Il a eu tort, même s’il ne touche pas la matière"],

        correct: ["Il a eu tort, même s’il ne touche pas la matière"]

    },

    {

        question: "Le mécanicien a posé la plaque de la pompe est posée au sol",

        options: ["Il a eu raison car il va rincer la plaque à l’eau", "Il a eu raison pour ne pas perdre de temps", "Il aurai dû se faire aider, pour aller chercher un bac propre et poser la plaque à l’intérieur", "Il l’a posé au sol, car il pensait que la ligne sera dans tous les cas nettoyée"],

        correct: ["Il aurai dû se faire aider, pour aller chercher un bac propre et poser la plaque à l’intérieur"]

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

   // Supprimer d'abord toute ancienne boîte d'erreur

   const ancienneErreur = document.querySelector(".erreur-fullscreen");

   if (ancienneErreur) {

       ancienneErreur.remove();

   }

   // Créer la nouvelle boîte d'erreur

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

    startCountdown(15); // durée en minutes

    afficherQuestion();

};
 
const questions = [

    {

        question: "Le poisson a attendu 3 heures sur la ligne de production",

        options: [

            "Les bactéries se sont développées ",

            "Ce n’est pas grave, le surgélateur va le surgeler ensuite",

            "Un retour en stock aurait dû être fait dès le début de la panne",

            "Il faut détruire toutes les matières qui ont dégelées lors de la panne"

        ],

        correct: [

            "Les bactéries se sont développées ",

            "Un retour en stock aurait dû être fait dès le début de la panne",

            "Il faut détruire toutes les matières qui ont dégelées lors de la panne"

        ],

        multiple: true

    },

    {

        question: "La sauce a attendu 3 heures dans le bas tampon à une température estimée à 60°C",

        options: [

            "Les bactéries se sont développées ",

            "La température reste correcte mais il faut refaire un CCP de cuisson",

            "La sauce a décanté mais je dose quand même ",

            "La sauce doit être mise en PSO"

        ],

        correct: [

            "La température reste correcte mais il faut refaire un CCP de cuisson",

            "La sauce doit être mise en PSO"

        ],

        multiple: true

    },

    {

        question: "Le mécanicien est venu de dehors sans se laver les mains",

        options: [

            "Il a eu raison car la panne était urgente",

            "Il a eu raison car il ne touche pas la matière",

            "Il a eu raison puisqu’il va les salir en manipulant la machine",

            "Il a eu tort, même s’il ne touche pas la matière"

        ],

        correct: ["Il a eu tort, même s’il ne touche pas la matière"],

        multiple: false

    },

    {

        question: "Le mécanicien a posé la plaque de la pompe est posée au sol",

        options: [

            "Il a eu raison car il va rincer la plaque à l’eau",

            "Il a eu raison pour ne pas perdre de temps",

            "Il aurai dû se faire aider, pour aller chercher un bac propre et poser la plaque à l’intérieur",

            "Il l’a posé au sol, car il pensait que la ligne sera dans tous les cas nettoyée"

        ],

        correct: ["Il aurai dû se faire aider, pour aller chercher un bac propre et poser la plaque à l’intérieur"],

        multiple: false

    }

];

let currentQuestionIndex = 0;

let countdownInterval;

function demarrerQuestionnaire() {

    document.getElementById("consignes-container").style.display = "none";

    document.getElementById("questionnaire").style.display = "block";

    document.getElementById("timer").style.display = "block";

    startCountdown(15); // 15 minutes

    afficherQuestion();

}

function afficherQuestion() {

    const question = questions[currentQuestionIndex];

    if (!question) return;

    const questionText = document.getElementById("question-text");

    const optionsContainer = document.getElementById("options-container");

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

    document.getElementById("next-button").style.display = "block";

}

document.getElementById("next-button").addEventListener("click", () => {

    const question = questions[currentQuestionIndex];

    const inputs = document.querySelectorAll('#options-container input');

    const selected = Array.from(inputs)

        .filter(input => input.checked)

        .map(input => input.value);

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

        clearInterval(countdownInterval);

        document.getElementById("questionnaire").innerHTML = "<h3>Bravo ! Vous avez terminé !</h3>";

        document.getElementById("timer").style.display = "none";

    }

});

function startCountdown(minutes) {

    let timeLeft = minutes * 60;

    const timerElement = document.getElementById("timer");

    countdownInterval = setInterval(() => {

        const min = Math.floor(timeLeft / 60);

        const sec = timeLeft % 60;

        const formatted = `${min}:${sec < 10 ? "0" : ""}${sec}`;

        timerElement.textContent = `⏳ Temps restant : ${formatted} ⏳`;

        if (timeLeft <= 0) {

            clearInterval(countdownInterval);

            timerElement.textContent = "⏳ Temps écoulé ⏳!";

            afficherMessageErreur("Temps écoulé. Vous n’avez pas réussi à vous évader à temps...");

        }

        timeLeft--;

    }, 1000);

}

function afficherMessageErreur(message) {

    const ancienne = document.querySelector(".erreur-fullscreen");

    if (ancienne) ancienne.remove();

    const div = document.createElement("div");

    div.className = "erreur-fullscreen";

    div.innerHTML = `
<div class="erreur-content">
<p>${message}</p>
<button onclick="retourAuxConsignes()">RETOUR</button>
</div>

    `;

    document.body.appendChild(div);

}

function retourAuxConsignes() {

    clearInterval(countdownInterval);

    currentQuestionIndex = 0;

    document.getElementById("questionnaire").style.display = "none";

    document.getElementById("timer").style.display = "none";

    document.getElementById("consignes-container").style.display = "block";

    document.querySelector(".erreur-fullscreen")?.remove();

}

function demarrerQuestionnaire() {
   document.getElementById("consignes-container").style.display = "none"; // Cache les consignes
   document.getElementById("questionnaire").style.display = "block";      // Affiche le questionnaire
   document.getElementById("timer").style.display = "block";              // Affiche le timer
   currentQuestionIndex = 0;  // Réinitialise le questionnaire
   afficherQuestion();        // Affiche la première question
   startCountdown(15);        // Lance le chrono (15 minutes)
}
 
