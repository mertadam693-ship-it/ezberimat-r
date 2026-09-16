const cards = [
    {
        question: "environment",
        answers: ["çevre"]
    },
    {
        question: "achievement",
        answers: ["başarı"]
    },
    {
        question: "ancient",
        answers: ["eski", "antik"]
    },
    {
        question: "dangerous",
        answers: ["tehlikeli"]
    }
];

let current = 0;
let correct = 0;

function startQuiz() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    document.getElementById("progress").textContent =
        `${current + 1} / ${cards.length}`;

    document.getElementById("question").textContent =
        cards[current].question;

    document.getElementById("answer").value = "";
    document.getElementById("result").textContent = "";

    document.getElementById("answer").focus();
}

function checkAnswer() {
    const userAnswer =
        document.getElementById("answer").value
        .trim()
        .toLowerCase();

    const acceptedAnswers = cards[current].answers;

    if (acceptedAnswers.includes(userAnswer)) {
        correct++;
        document.getElementById("result").textContent = "Correct!";
    } else {
        document.getElementById("result").textContent =
            `Wrong. Correct answer: ${acceptedAnswers[0]}`;
    }

    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    current++;

    if (current >= cards.length) {
        document.getElementById("quiz").classList.add("hidden");
        document.getElementById("finished").classList.remove("hidden");

        document.getElementById("score").textContent =
            `${correct} / ${cards.length} correct`;
        return;
    }

    showQuestion();
}
