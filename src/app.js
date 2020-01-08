import {isValid} from "./utils";
import './styles.css';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

input.addEventListener('input', () => {
   submitBtn.disabled = !isValid(input.value.trim());
});

const submitFormHandler = (e) => {
    e.preventDefault();

    if(isValid(input.value.trim())) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        };

        submitBtn.disabled = true;
        // Async request to server to save question
        console.log('Question', question);

        input.value = '';
        input.className = '';
    }
};

form.addEventListener('submit', submitFormHandler);

