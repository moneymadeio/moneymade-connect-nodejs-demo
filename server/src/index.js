const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const { Log } = require('@uk/log');
const { resolve } = require('path');
const fetch = require('node-fetch');

const port = process.env.PORT || 3000;
const publicKey = process.env.MONEYMADE_PUBLIC_KEY || 'qN2y6y9lRfXyjl57Q4kNLtpZFJxK4vOg5AuAkE3UseW4satONt1Cwp9c6zZKlzTK55fDjbv4XHAWEXdapiw==';
const privateKey = process.env.MONEYMADE_PRIVATE_KEY || '4mSepwZRN42YwtTkry10ApVdrglGoiedZmqKv8L5gfhh6VZTqnCcvFi2hDIPxDgEIk9+5a6p6Ge9iwQkl3GeV0hMaqp+3BBGQtQL22FHPqrcibcKA2e1U5diVaDws5omqOaJIjm1gh7NycR4vjXYMnSCmAhrlZMu4cj2EjLk0=';
const moneymadeApiUrl = process.env.MONEYMADE_API_URL || 'http://localhost:3005/platforms/connect/oauth';

const log = new Log(__filename);
const userData = require(resolve(__dirname, '../../', 'mock-user.json'));

const makeSignature = (base64Data) => {
  return crypto
    .createHmac('sha256', privateKey)
    .update(`${publicKey}${base64Data}${publicKey}`)
    .digest('hex');
}

const app = express();

app.use(bodyParser.json());
app.use(log.httpMiddleware({ body: false }));
app.use(express.static(resolve(__dirname, '../', 'public')));

app.get('/user/me', (req, res) => {
  res.status(200).json(userData);
});

app.post('/signin/oauth', async (req, res) => {
  const { info, signature } = req.body;
  
  if (signature !== makeSignature(info)) {
    return res.status(400).json({ status: 'Wrong signature' });
  }

  const jsonStr = Buffer.from(info, 'base64').toString('ascii');
  const data = JSON.parse(jsonStr);

  const body = {
    userId: data.userId,
    accessToken: 'platform-user-account-access-token',
  };

  const payload = Buffer.from(JSON.stringify(body)).toString('base64');

  await fetch(
    moneymadeApiUrl,
    {
      method: 'POST',
      body: JSON.stringify({
        payload,
        signature: makeSignature(payload),
      }),
      headers: {
        'Content-Type': 'application/json',
        'platform-api-key': publicKey,
        'request-signature': signature,
      },
    }
  )
  .then(res => res.json())
  .then(res => console.log(res));

  res.status(200).json({ status: 'OK' });
});

app.use((req, res) => {
  res.sendFile(resolve(__dirname, '../', 'public/index.html'));
})

app.listen(port, () => { console.log(`Demo server listens to port='${port}'`) });
