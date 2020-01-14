import {Question} from "./question";
import {isValid, createModal} from "./utils";
import {getAuthForm, authWithEmailAndPassword} from './auth';
import './styles.css';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

// loading question list from local storage when page loaded/reloaded
window.addEventListener('load', Question.renderList);
// moderate input text and submit button
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value.trim());
});
//open modal window
const renderModalAfterAuth = (content) => {
    if(typeof content === 'string') {
        createModal('Error!', content);
    } else {
        createModal('Questions list', Question.listToHtml(content));
    }
};

const authFormHandler = (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('button');
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;

    btn.disabled = true;
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false);
};

const openModal = () => {
    createModal('Authorisation', getAuthForm());
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
};

modalBtn.addEventListener('click', openModal);
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

