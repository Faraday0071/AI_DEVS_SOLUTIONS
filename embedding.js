const doTask = require('./index.js');
const key = process.env.OPEN_AI_KEY;

async function getEmebeding(str) {
    try {

        const result = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                model: 'text-embedding-ada-002',
                input: str,
            })
        })
        const res = await result.json()
        return res.data[0].embedding;
    } catch (err) {
        console.error(err);
        return null;
    }
};

async function embedding(data) {
    const { msg } = data;
    const [, str] = msg.split(': ');
    console.log(data);

    const res = await getEmebeding(str);
    return {
        answer: res,
    }
}

doTask('embedding', embedding);
