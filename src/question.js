export class Question {
    static create(question) {
        return fetch('https://podcast-test-app.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'aplication/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question;
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList() {
        const list = document.querySelector('#list');
        const questions = getQuestionsFromLocalStorage();
        list.innerHTML = questions.length ?
            questions.map(createList).join('') :
            `<div class="mui&#45;&#45;text-headline">You haven't any questions!</div>`;
    }
}

const createList = (question) => {
    return `<div>
            <p><b>${question.text}</b></p>
            <p>
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </p>
            </div>
            <br>`;
};

const addToLocalStorage = (question) => {
    const all = getQuestionsFromLocalStorage();
    all.unshift(question);
    localStorage.setItem('questions', JSON.stringify(all));
};

const getQuestionsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('questions')) || [];
};