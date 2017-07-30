import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphsqlHTTP from 'express-graphql';

import googleAuth from './src/helpers/verifyGoogleAuth';

import schema from './src/schema';

const app = express();
app.use(bodyParser.json());


app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT");

  if (req.method === 'OPTIONS') {
      res.status(200);
      return res.end();
  }
  next()
});

app.post('/signin', function(req, res) {

    googleAuth(req.body.jwt, req.body.googleId);
    return res.end();
});

app.use('/api', graphsqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000);
