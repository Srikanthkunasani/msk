// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Who is father of C Language?",
        imgSrc : "img/q1.png",
        choiceA : "Bjarne Stroustrup",
        choiceB : "Dennis Ritchie",
        choiceC : "James A. Gosling",
        correct : "B"
    },{
        question : "C Language developed at _____?",
        imgSrc : "img/q2.png",
        choiceA : "AT & T's Bell Laboratories  in 1972",
        choiceB : "AT & T's Bell Laboratories  in 1970",
        choiceC : "Sun Microsystems in 1973",
        correct : "A"
    },{
        question : "The default access specifer for the class members is",
        imgSrc : "img/q3.png",
        choiceA : "public",
        choiceB : "private",
        choiceC : "protected",
        correct : "B"
    },{
        question : "Which operator is required to be overloaded as member function only?",
        imgSrc : "img/q4.png",
        choiceA : "++ (postfix version)",
        choiceB : "=",
        choiceC : "_",
        correct : "B"
    },{
        question : "In Python 3, the maximum value for an integer is 2^(63) - 1:",
        imgSrc : "img/q5.png",
        choiceA : "TRUE",
        choiceB : "FALSE",
        choiceC : "1or2 is correct",
        correct : "B"
    },{
        question : "Primitive variables are stored on Stack.",
        imgSrc : "img/q6.png",
        choiceA : "TRUE",
        choiceB : "FALSE",
        choiceC : "1or2 is correct",
        correct : "A"
    },{
        question : "The protocol data unit(PDU) for the application layer in the Internet stack is",
        imgSrc : "img/q7.png",
        choiceA : "Segment",
        choiceB : "Message",
        choiceC : "Datagram",
        correct : "B"
    },{
        question : "Find the remainder when 25102 is divided by 17?",
        imgSrc : "img/q8.png",
        choiceA : "4",
        choiceB : "15",
        choiceC : "82",
        correct : "A"
    },{
        question : "Industrial Licensing was finally abolished in India in which of the following years ?",
        imgSrc : "img/q9.png",
        choiceA : "1990",
        choiceB : "1991",
        choiceC : "1995",
        correct : "B"
    },{
        question : "Where was the first cinema demonstrated in India?",
        imgSrc : "img/q10.png",
        choiceA : " Hindi Theatre at Kolkata",
        choiceB : "Bombay (Now Mumbai) at Watkins Hotel",
        choiceC : "Athenaeeum and Chaurang Theatre",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 120; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
