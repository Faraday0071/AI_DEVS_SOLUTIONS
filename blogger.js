const doTask = require('./index.js');
const key = process.env.OPEN_AI_KEY;

async function writeChapter(str) {
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
                        content: `Piszesz fragment postu na bloga o robieniu margerity. Zacznij tekst od napisania tytułu akapitu. Napisz akapit o tytule: ${str}`,
                    }
                ]
            })
        })
        const data = await result.json()
        return data.choices[0].message.content;
    } catch (err) {
        console.error(err);
        return null;
    }
};

async function blogger(data) {
    const results = await Promise.allSettled(data.blog.map((str) => writeChapter(str)));
    console.log(results);

    return {
        answer: results.map(({ value }) => value),
    }
}

doTask('blogger', blogger);
