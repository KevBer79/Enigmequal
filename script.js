const questions = [
  {
    question: "Quel est le nom du héros de Prison Break ?",
    options: ["Michael Scofield", "Lincoln Burrows", "PAPA", "Fernando Sucre"],
    reponse: "Michael Scofield"
  },
  {
    question: "Quels sont les éléments d’un plan d’évasion ?",
    options: ["Un tunnel", "Une alarme", "Un complice", "Une tasse de café"],
    reponse: ["Un tunnel", "Un complice"],
    multiple: true
  },
  {
    question: "Quelle est la spécialité de Michael ?",
    options: ["Médecin", "Avocat", "Ingénieur en bâtiment", "Gardien de prison"],
    reponse: "Ingénieur en bâtiment"
  }
];

let currentQuestionIndex = 0;

function afficherQuestion() {
  const container = document.getElementById("question-text");
  const q = questions[currentQuestionIndex];

  let inputHTML = "";
  const inputType = q.multiple ? "checkbox" : "radio";

  q.options.forEach(option => {
    inputHTML += `
      <label>
        <input type="${inputType}" name="reponse" value="${option}">
        ${option}
      </label><br>`;
  });

  container.innerHTML = `
    <div class="question-box">
      <h2>${q.question}</h2>
      <form id="quiz-form">
        ${inputHTML}
        <button type="submit">Valider</button>
      </form>
    </div>
  `;

  document.getElementById("quiz-form").onsubmit = verifierReponse;
}

function verifierReponse(e) {
  e.preventDefault();
  const q = questions[currentQuestionIndex];
  const elementsChecked = document.querySelectorAll('input[name="reponse"]:checked');
  let reponseUtilisateur = Array.from(elementsChecked).map(el => el.value);

  let estCorrect = false;

  if (q.multiple) {
    estCorrect = reponseUtilisateur.length === q.reponse.length &&
                 reponseUtilisateur.every(val => q.reponse.includes(val));
  } else {
    estCorrect = reponseUtilisateur[0] === q.reponse;
  }

  const container = document.getElementById("questionnaire");

  if (estCorrect) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      afficherQuestion();
    } else {
      container.innerHTML = `<div class="question-box"><h2>Bravo ! Questionnaire terminé !</h2></div>`;
    }
  } else {
    container.innerHTML += `<p style="color:red; font-weight:bold;">Mauvaise réponse, essaye encore !</p>`;
  }
}

window.onload = afficherQuestion;
