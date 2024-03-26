const doTask = require('./index.js');
const key = process.env.OPEN_AI_KEY;

async function getName(question) {
    try {
        const result = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Zwróć imię osoby która jest zawarta w pytaniu. Zwróć samo imię bez zadnego dodatkowego komentarza. O to pytanie: ${question}`,
                    }
                ]
            })
        });

        const data = await result.json();
        return data.choices[0].message.content;
    } catch(err) {
        console.error(err);
    }
}

async function getResponse(context, question) {
    try {
        const result = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Uzywając tylko tego kontestu: ${context} \n Odpowiedz na pytanie: ${question}`,
                    }
                ]
            })
        });

        const data = await result.json();
        return data.choices[0].message.content;
    } catch(err) {
        console.error(err);
    }
}

async function inprompt (data) {
    const nameResponse = await getName(data.question);
    const name = nameResponse.trim().replaceAll(/[^a-zA-Z]/g, '');
    const ctx = data.input.filter(s => s.includes(name)).join(' ');
    const answer = await getResponse(ctx, data.question);
    
    return {
        answer,
    }
}

doTask('inprompt', inprompt);
