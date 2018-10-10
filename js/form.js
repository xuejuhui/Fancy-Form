// Questions Array
const questions = [
{question: "Enter Your First Name", answer: ""},
{question: "Enter Your Last Name", answer: ""},
{question: "Enter Your Email", pattern:/\S+@\S+\.\S+/,answer:""},
{question: "Password", type:"password"}
]

let position = 0;
//Transition Times

const shakeTime = 100;
const switchTime = 200;

// DOM Elements
const formBox = document.getElementById('form-box');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const inputGroup = document.getElementById('input-group');
const inputField = document.getElementById('input-field');
const inputLabel = document.getElementById('input-label');
const inputProgress = document.getElementById('input-progress');
const progress = document.getElementById('progress-bar');
console.log(inputLabel)


const getQuestion = () =>{
	console.log(questions[position].question)
	inputLabel.innerHTML = questions[position].question
	inputField.type = questions[position].type || "text";
	inputField.value = questions[position].answer || "";
	inputField.focus();
	progress.style.width = (position*100) / questions.length + "%";	
	prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

	showQuestion()
}

const showQuestion = ()=>{
	inputGroup.style.opacity = 1;
	inputProgress.style.transition = "";
	inputProgress.style.width = "100%"
}
const hideQuestion = ()=>{
	inputGroup.style.opacity = 0;
	inputProgress.style.width = 0;
	inputProgress.style.transition = "none"
	inputLabel.style.marginLeft = 0;
	inputGroup.style.border = null;
}

const formComplete = ()=>{
	console.log(questions)
	const h1 = document.createElement("h1");
	h1.classList.add("end")
	h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and will get an email shortly`));
	setTimeout(()=>{
		formBox.parentElement.appendChild(h1);
		setTimeout(()=> h1.style.opacity = 1, 50);
	}, 1000);
};

const inputFail = ()=> {
  formBox.className = 'error';
  // Repeat Shake Motion -  Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

const inputPass = ()=>{
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer In Array
  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // // Form Complete
    formComplete();
  }
}
const validate = ()=>{
	if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}
const transform = (x, y)=> {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}


//Events

document.addEventListener("DOMContentLoaded", getQuestion);
nextBtn.addEventListener("click", validate);
document.addEventListener("keyup", e=>{
	if(e.keyCode ===13){
		validate();
	}
})

