const body = {
  apikey: process.env.API_KEY,
}

async function authorization(taskName) {
  const result =  await fetch(`https://tasks.aidevs.pl/token/${taskName}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const { token } = await result.json();
  return token;
}

async function getTask(taskName, extraInfo) {
  const token = await authorization(taskName);
  const task = !extraInfo 
    ? await fetch(`https://tasks.aidevs.pl/task/${token}`) 
    : await fetch(`https://tasks.aidevs.pl/task/${token}`, extraInfo)
  const result = await task.json();
  return { result, token }
}

async function sendTask(token, body) {
  const code = await fetch(`https://tasks.aidevs.pl/answer/${token}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  console.log(code);
 }


 async function doTask(taskName, resolve, extraInfo) {
  const { result, token } = await getTask(taskName, extraInfo);
  const body = await resolve(result);

  if (!body) {
    return;
  }

  await sendTask(token, body);
 }

async function sendTask(token, body) {
  const code = await fetch(`https://tasks.aidevs.pl/answer/${token}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  console.log(code);
 }

module.exports = doTask;
 