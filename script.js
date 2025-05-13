const questions = [
    {
        question: "Le poisson a attendu 3 heures sur la ligne de production",
        options: ["Les bactéries se sont développées", "Ce n’est pas grave, le surgélateur va le surgeler ensuite", "Un retour en stock aurait dû être fait dès le début de la panne", "Il faut détruire toutes les matières qui ont dégelées lors de la panne"],
        answer: ["Les bactéries se sont développées", "Un retour en stock aurait dû être fait dès le début de la panne", "Il faut détruire toutes les matières qui ont dégelées lors de la panne"]
    },
    {
        question: "Qui est le frère de Michael Scofield ?",
        options: ["T-Bag", "Sucre", "Lincoln Burrows", "Mahone"],
        answer: "Lincoln Burrows"
    }
];

let currentQuestion = 0;

function afficherQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question-text").textContent = question.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => verifierReponse(option);
        optionsContainer.appendChild(button);
    });
}

function verifierReponse(reponse) {
    const isCorrect = reponse === questions[currentQuestion].answer;
    if (!isCorrect) {
        alert("Mauvaise réponse ! Réessayez...");
        return;
    }

    document.getElementById("next-button").style.display = "inline-block";
}

document.getElementById("next-button").addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        afficherQuestion();
        document.getElementById("next-button").style.display = "none";
    } else {
        alert("Bravo, vous avez terminé le questionnaire !");
    }
});

// Compte à rebours
function startCountdown(minutes) {
    let timer = minutes * 60;
    const timerElement = document.getElementById("timer");

    const interval = setInterval(() => {
        let min = Math.floor(timer / 60);
        let sec = timer % 60;
        timerElement.textContent = `⏳ Temps restant : ${min}:${sec < 10 ? "0" : ""}${sec} ⏳`;

        if (--timer < 0) {
            clearInterval(interval);
            timerElement.textContent = "⏳ Temps écoulé !";
            alert("Temps écoulé ! Mission échouée...");
        }
    }, 1000);
}

window.onload = () => {
    afficherQuestion();
    startCountdown(20);
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
};
