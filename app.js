
let currentTab = 'learn';
let questions = [];
let currentQuestion = 0;
let score = 0;

function showTab(tab) {
document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
document.getElementById(tab).classList.add('active');
}

fetch('data/questions.json')
.then(res => res.json())
.then(data => {
questions = data;
loadSlides();
loadQuestion();
});

function loadSlides() {
const container = document.getElementById('slides-container');
for (let i = 1; i <= 50; i++) {
let img = document.createElement('img');
img.src = 'images/slide_' + i + '.png';
img.onerror = function() { this.style.display = 'none'; }
container.appendChild(img);
}
}

function loadQuestion() {
const q = questions[currentQuestion];
document.getElementById('question').innerText = q.question;
document.getElementById('progress').innerText = 
"Question " + (currentQuestion+1) + " of " + questions.length;

const answersDiv = document.getElementById('answers');
answersDiv.innerHTML = '';
q.answers.forEach((a, index) => {
const btn = document.createElement('button');
btn.innerText = a;
btn.onclick = () => selectAnswer(index);
answersDiv.appendChild(btn);
});
}

function selectAnswer(index) {
if (index === questions[currentQuestion].correct) {
score++;
}
}

function nextQuestion() {
currentQuestion++;
if (currentQuestion < questions.length) {
loadQuestion();
} else {
document.getElementById('final-score').innerText = 
"Final Score: " + score + " / " + questions.length;
showTab('results');
}
}

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('js/service-worker.js');
}
