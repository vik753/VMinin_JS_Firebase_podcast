import {Question} from "./question";
import {isValid} from "./utils";
import './styles.css';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
// loading question list from local storage when page loaded/reloaded
window.addEventListener('load', Question.renderList);
// moderate input text and submit button
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value.trim());
});
// form worker
const submitFormHandler = (e) => {
    e.preventDefault();

    if (isValid(input.value.trim())) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        };

        submitBtn.disabled = true;
        // Async request to server to save question
        Question.create(question).then(() => {
            input.value = '';
            input.className = '';
        });
    }
};

form.addEventListener('submit', submitFormHandler);

// 55.00 https://www.youtube.com/watch?v=KS2ngnRAKlg&feature=youtu.be

