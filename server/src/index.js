const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const { Log } = require('@uk/log');
const { resolve } = require('path');
const fetch = require('node-fetch');
const { MoneymadeConnect } = require('@moneymade/connect');
const cors = require('cors');

const port = process.env.PORT || 3000;
const publicKey = process.env.MONEYMADE_PUBLIC_KEY || 'qN2y6y9lRfXyjl57Q4kNLtpZFJxK4vOg5AuAkE3UseW4satONt1Cwp9c6zZKlzTK55fDjbv4XHAWEXdapiw==';
const privateKey = process.env.MONEYMADE_PRIVATE_KEY || '4mSepwZRN42YwtTkry10ApVdrglGoiedZmqKv8L5gfhh6VZTqnCcvFi2hDIPxDgEIk9+5a6p6Ge9iwQkl3GeV0hMaqp+3BBGQtQL22FHPqrcibcKA2e1U5diVaDws5omqOaJIjm1gh7NycR4vjXYMnSCmAhrlZMu4cj2EjLk0=';

const moneymade = new MoneymadeConnect({
  publicKey,
  privateKey,
});

const log = new Log(__filename);
const userData = require(resolve(__dirname, '../', 'mock-user.json'));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(log.httpMiddleware({ body: false }));
app.use(express.static(resolve(__dirname, '../', 'public')));

app.get('/user/me', (req, res) => {
  res.status(200).json(userData);
});

app.post('/signin/oauth',
  moneymade.expressMiddleware(),
  async (req, res) => {
    const { oauthSignature, payload } = req.body;
    const { userId } = payload;
    
    // oauth logic here
    const accessToken = 'access-token-with-access-right-to-fetch-balances';

    try {
      await moneymade.finishOauth({
        accessToken,
        userId,
        oauthSignature,
        oauthPayload: payload,
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }

    return res
      .status(200)
      .send({ status: 'OK' });
  }
);

app.use((req, res) => {
  res.sendFile(resolve(__dirname, '../', 'public/index.html'));
})

app.listen(port, () => { console.log(`Demo server listens to port='${port}'`) });
