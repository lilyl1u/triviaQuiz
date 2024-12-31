
var questions= [{
	question: "What is the longest bone in the human body?",
	choices: ["Sternum", "Humerus", "Femur", "Tibia"],
	correctAnswer: 2
}, {
	question: "What is the largest country by land in the world?",
	choices: ["Canada", "Russia", "China", "Australia"],
	correctAnswer:1
}, {
	question: "Who was the first president of America?",
	choices: ["Donald Trump", "Abraham Lincoln", "Jimmy Carter", "George Washington"],
	correctAnswer: 3
}, {
	question: "Who is the current richest person in the world?",
	choices: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Mark Zuckerberg"],
	correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function (){
	displayCurrentQuestion();
	$(this).find(".quizMessage").hide();
	$(this).find(".nextButton").on("click", function(){
		if (!quizOver){//continue
			value = $("input[type='radio']:checked").val();
			if (value == undefined){
				$(document).find(".quizMessage").text("Please select an answer");
				$(document).find(".quizMessage").show();
			}
			else{
				$(document).find(".quizMessage").hide();
				if (value == questions[currentQuestion].correctAnswer){
					correctAnswers++;
				}
				currentQuestion++;
				if (currentQuestion < questions.length){
					displayCurrentQuestion();
				}
				else{
					displayScore();
					$(document).find(".nextButton").text("Play Again?");
					quizOver=true;
				}
			}
		}
		else{
			quizOver = false;
			$(document).find(".nextButton").text("Next Question");
			resetQuiz();
			displayCurrentQuestion();
			hideScore();
		}
	});
});

function displayCurrentQuestion(){
	//shows on screen
	console.log("In display current Question");



	var question = questions[currentQuestion].question;
	var questionClass = $(document).find(".quizContainer>.question");
	var choiceList = $(document).find(".quizContainer> .choiceList");
	var numChoices = questions[currentQuestion].choices.length;

	//set questionclass text to current questions
	$(questionClass).text(question);

	//remove current <li> elements if any
	$(choiceList).find("li").remove();

	var choice;
	for (i=0; i< numChoices; i++){
		choice = questions[currentQuestion].choices[i];
		$('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
	}
}

function resetQuiz(){
	currentQuestion=0;
	correctAnswers=0;
	hideScore();
}

function displayScore(){
	$(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length );
	$(document).find(".quizContainer > .result").show();
}


function hideScore(){
	$(document).find(".result").hide();
}
