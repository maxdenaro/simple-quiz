const quiz = document.querySelector('.quiz');
const quizAnswers = quiz.querySelector('.quiz-question__answers');
const quizQuestionTitle = quiz.querySelector('.quiz-question__title');
const quizQuestionQuantity = quiz.querySelector('.quiz__questions');
const nextBtn = quiz.querySelector('.quiz-question__btn');
let resultsObj = {};
let counter = 0;


fetch("./data.json")
	.then(response => response.json())
	.then(response => {
		changeQuestion(response)
		valid();

		nextBtn.addEventListener('click', (e) => {
			e.currentTarget.disabled = true;
			if (counter + 1 < response.length) {
				counter++;
				changeQuestion(response);
				valid();
			} else {
				console.log('Вопросы кончились!')
				let formData = new FormData(quiz);
				console.log(formData)
			}
		});
	})

function changeQuestion(data) {
	console.log(data);

	quizAnswers.innerHTML = '';

	let questionData = data[counter];

	let length = data.length;

	quizQuestionTitle.textContent = questionData.title;
	quizQuestionQuantity.textContent = `${counter + 1} из ${length}`;

	for (item of questionData.answers) {
		console.log(item)

		quizAnswers.insertAdjacentHTML('beforeend', 
			`
				<label class="quiz-question__label">
					<input type="${item.type}" data-valid="false" class="quiz-question__answer" name="${questionData.answer__alias}" ${item.type == 'text' ? 'placeholder="Введите ваш вариант"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
					<span>${item.answer_title}</span>
				</label>
			`
		);
	}	
}

function valid() {
	quizAnswers.querySelectorAll('input').forEach((el) => {
		console.log(el)
		if (el.type !== 'text') {
			el.addEventListener('change', () => {
				el.checked ? nextBtn.disabled = false : nextBtn.disabled = true;
			});
		} else {
			el.addEventListener('input', () => {
				quizAnswers.querySelectorAll('input').forEach((el) => {
					el.checked = false;
				});
				el.value ? nextBtn.disabled = false : nextBtn.disabled = true;
			});
		}
	});
}