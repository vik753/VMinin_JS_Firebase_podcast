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
    }
}


const addToLocalStorage = (question) => {
    const all = getQuestionsFromLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all));
};

const getQuestionsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('questions') || '[]')
};