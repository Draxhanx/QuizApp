const quetions = [
    {
        question: "What is the capital of India ?",
        answer: [
            { text: "Bhopal", correct: false },
            { text: "Mumbai", correct: false },
            { text: "Up", correct: false },
            { text: "Delhi", correct: true },

        ]
    },
    {

        question: "What is the capital of Japan ?",
        answer: [
            { text: "Tokyo", correct: true },
            { text: "Bejing", correct: false },
            { text: "New York", correct: false },
            { text: "Paris", correct: false },

        ]
    },

    {
        question: "Who is the CEO of Google ?",
        answer: [
            { text: "Sundar Pichai", correct: true },
            { text: "Mark Zukerberg", correct: false },
            { text: "Tim Cook", correct: false },
            { text: "Elon Musk", correct: false },

        ]
    },

    {
        question: "Who is the CEO of Facebook ?",
        answer: [
            { text: "Mark Zukerberg", correct: true },
            { text: "Elon Musk", correct: false },
            { text: "Tim Cook", correct: false },
            { text: "Bill Gates", correct: false },

        ]
    }
]
const quetionElemnt = document.getElementById("quetion");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next");

let currentQuetionIndex = 0 ;
let score = 0;

function startQuiz(){
     currentQuetionIndex = 0 ;
     score = 0;
    nextButton.innerHTML = "Next";
    showQuetion();

}

function showQuetion(){
    resetState();
    let currentQuetion = quetions[currentQuetionIndex];
    let questionNo = currentQuetionIndex + 1 ;
    quetionElemnt.innerHTML= questionNo + "." + currentQuetion.question;

    currentQuetion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text ;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click" , slectAnswer)
    });

};

startQuiz();

function resetState (){
    nextButton.style.display = "none";
    while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    };
};



function slectAnswer(e){
    const slectedBtn = e.target;
    const isCorrect = slectedBtn.dataset.correct === "true";
    if(isCorrect){
        slectedBtn.classList.add("correct");
        score++;
    } else {
        slectedBtn.classList.add("incorrect");
    }

        Array.from(answerButton.children).forEach(button =>{
            if(button.dataset.correct === "true"){
                button.classList.add ("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
}

function showScore (){
    resetState();
    quetionElemnt.innerHTML = `You scored ${score} out of ${quetions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuetionIndex++;
    if (currentQuetionIndex < quetions.length){
        showQuetion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click" , ()=>{
    if (currentQuetionIndex < quetions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})