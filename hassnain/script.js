const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Central Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Simple Sheets", correct: false },
            { text: "Cars SUVs Sailboats", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { text: "<script>", correct: false },
            { text: "<style>", correct: true },
            { text: "<css>", correct: false },
            { text: "<stylesheet>", correct: false }
        ]
    },
    {
        question: "What year was JavaScript created?",
        answers: [
            { text: "1995", correct: true },
            { text: "2000", correct: false },
            { text: "1990", correct: false },
            { text: "1985", correct: false }
        ]
    },
    {
        question: "Which company developed the React library?",
        answers: [
            { text: "Google", correct: false },
            { text: "Facebook", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Apple", correct: false }
        ]
    },
    {
        question: "Which tag is used to display a picture on a webpage?",
        answers: [
            { text: "<image>", correct: false },
            { text: "<pic>", correct: false },
            { text: "<img>", correct: true },
            { text: "<src>", correct: false }
        ]
    },
    {
        question: "What does JSON stand for?",
        answers: [
            { text: "JavaScript Object Notation", correct: true },
            { text: "Java Standard Output Network", correct: false },
            { text: "JavaScript Output Name", correct: false },
            { text: "Java Object Script Notation", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "font-style", correct: false },
            { text: "font-weight", correct: false },
            { text: "font-size", correct: true },
            { text: "text-size", correct: false }
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            { text: "styles", correct: false },
            { text: "class", correct: false },
            { text: "style", correct: true },
            { text: "font", correct: false }
        ]
    },
    {
        question: "What does the ‘var’ keyword do in JavaScript?",
        answers: [
            { text: "Declares a variable", correct: true },
            { text: "Defines a function", correct: false },
            { text: "Creates an object", correct: false },
            { text: "Starts a loop", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to specify a footer for a document or section?",
        answers: [
            { text: "<bottom>", correct: false },
            { text: "<footer>", correct: true },
            { text: "<section>", correct: false },
            { text: "<aside>", correct: false }
        ]
    },
    {
        question: "What is the default display value of a <div> element?",
        answers: [
            { text: "inline", correct: false },
            { text: "block", correct: true },
            { text: "inline-block", correct: false },
            { text: "flex", correct: false }
        ]
    },
    {
        question: "In JavaScript, what is the output of: typeof NaN?",
        answers: [
            { text: "'number'", correct: true },
            { text: "'NaN'", correct: false },
            { text: "'undefined'", correct: false },
            { text: "'object'", correct: false }
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false },
            { text: "var colors = ['red', 'green', 'blue']", correct: true },
            { text: "var colors = 'red', 'green', 'blue'", correct: false },
            { text: "var colors = {'red', 'green', 'blue'}", correct: false }
        ]
    }
];

const questionNumberElement = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    resultContainer.classList.add("hide");
    quizContainer.classList.remove("hide");
    nextButton.disabled = true;
    showQuestion();
}

function showQuestion() {
    answered = false;
    nextButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.textContent = currentQuestion.question;

    // Clear previous answers
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });

    // Change Next button text on last question
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";
}

function selectAnswer(e) {
    if (answered) return;

    answered = true;
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    // Show correct answer too
    Array.from(answersContainer.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    startQuiz();
});

function showResult() {
    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");

    const percentage = (score / questions.length) * 100;
    const passFail = percentage >= 50 ? "Passed" : "Failed";

    scoreText.textContent = `You scored ${score} out of ${questions.length} (${percentage.toFixed(1)}%) - ${passFail}`;
}

// Start the quiz initially
startQuiz();
