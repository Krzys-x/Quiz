const questions = [
    {
        question: "Which structure is for zero conditional?",
        answers: ["If + present simple, will future simple.", "If + present simple, present simple.", "If + past simple, would.", "If + past perfect, would have (third form)"],
        correct: 2
    },
    {
        question: "Which structure is for first conditional?",
        answers: ["If + present simple, will future simple.", "If + present simple, present simple.", "If + past simple, would.", "If + past perfect, would have (third form)"],
        correct: 1
    },
    {
        question: "Which structure is for second conditional?",
        answers: ["If + present simple, will future simple.", "If + present simple, present simple.", "If + past perfect, would have (third form)", "If + past simple, would."],
        correct: 4
    },
    {
        question: "Which structure is for third conditional?",
        answers: ["If + present simple, will future simple.", "If + present simple, present simple.", "If + past perfect, would have (third form)", "If + past simple, would."],
        correct: 3
    },
    {
        question: "The safest ..... of food in a survival situation are animals.",
        answers: ["attitude", "source", "tasks", "heat"],
        correct: 2
    },
    {
        question: "A positive mental ..... is most likely to help you survive.",
        answers: ["attitude", "heat", "tasks", "protect"],
        correct: 1
    },
    {
        question: "The best place to build a shelter is a place, which will ..... you from  falling trees and rocks.",
        answers: ["heat", "tasks", "protect", "help"],
        correct: 3
    },
    {
        question: "You can use fire, to get ......",
        answers: ["tasks", "heat", "health", "food"],
        correct: 2
    },
    {
        question: 'Translate word "zapałki" to english.',
        answers: ["flint and steal", "matches", "lighting sticks", "lighters"],
        correct: 2
    },
    {
        question: 'Translate word "latarka" to english.',
        answers: ["torch", "lamp", "light", "lighter"],
        correct: 1
    },
    {
        question: 'Translate word "lina" to english.',
        answers: ["line", "pipe", "linear", "rope"],
        correct: 4
    },
    {
        question: 'Translate word "gwizdek" to english',
        answers: ["wistle", "whistle", "whistling", "whistler"],
        correct: 2
    },
    {
        question: 'Translate word "susza" to english',
        answers: ["dry", "draught", "drougt", "drought"],
        correct: 4
    },
    {
        question: 'Translate phrase "trzsienie ziemi" to english',
        answers: ["earthquacke", "earth shake", "earthquake", "earthshake"],
        correct: 3
    },
    {
        question: 'Translate phrase "erupcja wulkanu" to english.',
        answers: ["vulcanic eruption", "vulcanic explosion", "vulcano eruption", "vulcano explosion"],
        correct: 1
    },
    {
        question: 'Translate phrase "zmiana klimatu" to english',
        answers: ["clinate chage", "climate change", "changing climat", "climate changing"],
        correct: 2
    },
    {
        question: 'Translate word "powódź" to english',
        answers: ["flood", "foding", "flod", "None of above"],
        correct: 1
    },
    {
        question: "I ....., until you wake me up",
        answers: ["will sleep", "sleep", "had slept", "would sleep"],
        correct: 1
    },
    {
        question: "When water reaches 100, it ......",
        answers: ["will boil", "boil", "doesn't boil", "boils"],
        correct: 4
    },
    {
        question: "If you want, I ..... you something.",
        answers: ["coud give", "takes", "can give", "cans give"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('nextButton');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('answer-button');
        button.addEventListener('click', () => selectAnswer(index, button));
        answersElement.appendChild(button);
        
        // Trigger animation
        setTimeout(() => {
            button.classList.add('show');
        }, 100 * index); // Stagger the animations
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(index, button) {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correct - 1) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
        // Trigger confetti
        confetti();
    } else {
        // Shake effect for wrong answer
        button.classList.add('shake');
        setTimeout(() => {
            button.classList.remove('shake');
        }, 500); // Remove shake class after animation
    }
    
    Array.from(answersElement.children).forEach((btn, i) => {
        if (i === currentQuestion.correct - 1) {
            btn.style.backgroundColor = 'green';
        } else {
            btn.style.backgroundColor = 'red';
        }
        btn.disabled = true;
    });
    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerText = "Quiz is over!";
        answersElement.innerHTML = ''; // Clear the answers
        nextButton.classList.add('hidden'); // Hide the next button
    }
});

startGame();