const doTask = require('./index.js');

function liar(data) {
    return {
        answer: data.answer.includes('Warsaw') ? 'YES' : 'NO',
    }
}

const form = new FormData();
form.append('question', 'What is the capital of Poland?');

doTask('liar', liar, {
    method: 'POST',
    body: form,
});
