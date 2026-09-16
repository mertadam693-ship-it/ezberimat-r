let cards = [];
let current = 0;
let correct = 0;
let isChecking = false;

// Testi başlatan ve metni okuyan fonksiyon
function startCustomQuiz() {
    const text = document.getElementById("custom-words").value;
    const lines = text.split("\n");
    cards = [];

    lines.forEach(line => {
        const parts = line.split(":");
        if (parts.length === 2) {
            const questionText = parts[0].trim();
            const answersArray = parts[1].split(",").map(a => a.trim().toLowerCase());
            
            if (questionText && answersArray.length > 0) {
                cards.push({ question: questionText, answers: answersArray });
            }
        }
    });

    if (cards.length === 0) {
        alert("Lütfen en az bir tane 'ingilizce : türkçe' formatında kelime girin!");
        return;
    }

    current = 0;
    correct = 0;
    
    // Soruları karıştır
    cards.sort(() => Math.random() - 0.5);

    document.getElementById("home").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    showQuestion();
}

// Soruyu ekranda gösteren fonksiyon
function showQuestion() {
    isChecking = false;
    const answerInput = document.getElementById("answer");
    
    answerInput.disabled = false;
    answerInput.value = "";
    document.getElementById("progress").textContent = `\({current + 1} /\){cards.length}`;
    document.getElementById("question").textContent = cards[current].question;
    document.getElementById("result").textContent = "";
    
    answerInput.focus();
}

// Girilen cevabı kontrol eden fonksiyon
function checkAnswer() {
    if (isChecking) return;
    
    const answerInput = document.getElementById("answer");
    const userAnswer = answerInput.value.trim().toLowerCase();
    
    if (!userAnswer) return;

    isChecking = true;
    answerInput.disabled = true;

    const accepted = cards[current].answers;

    if (accepted.includes(userAnswer)) {
        correct++;
        document.getElementById("result").textContent = "Doğru! 🎉";
        document.getElementById("result").style.color = "#4ade80"; // Yeşil renk
    } else {
        document.getElementById("result").textContent = `Yanlış! Doğru cevap: ${accepted[0]}`;
        document.getElementById("result").style.color = "#f87171"; // Kırmızı renk
    }

    setTimeout(nextQuestion, 1200);
}

// Sonraki soruya veya bitiş ekranına geçen fonksiyon
function nextQuestion() {
    current++;
    if (current >= cards.length) {
        document.getElementById("quiz").classList.add("hidden");
        document.getElementById("finished").classList.remove("hidden");
        document.getElementById("score").textContent = `\({correct} /\){cards.length} Doğru Yaptın!`;
        return;
    }
    showQuestion();
}

// Enter tuşuna basıldığında cevabı gönderme
document.getElementById("answer").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkAnswer();
    }
});
