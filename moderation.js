const doTask = require('./index.js');
const key = process.env.OPEN_AI_KEY;

async function getIsItViolation(str) {
    try {
        const result = await fetch('https://api.openai.com/v1/moderations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                input: str,
            })
        })
        const data =  await result.json();
        const flagged = data.results[0].flagged;
        return +flagged;
    } catch(err) {
        console.error(err);
        return null;
    }

}

async function moderation(data) {
    const result = await getIsItViolation(data.input[0])
    const results = await Promise
        .allSettled(data.input.map(async (input) => await  getIsItViolation(input)));

    return {
        answer: results.map(({ value }) => value),
    }
}

doTask('moderation', moderation);
