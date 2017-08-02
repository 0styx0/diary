import * as express from 'express';
import * as bodyParser from 'body-parser';
import addUserToDb from './src/helpers/addUserToDb';
import googleAuth from './src/helpers/verifyGoogleAuth';
import * as jsonwebtoken from 'jsonwebtoken';
import config from './config';

import { graphqlExpress } from 'apollo-server-express';

import schema from './src/schema';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT");

  if (req.method === 'OPTIONS') {
      res.status(200);
      return res.end();
  }
  next()
});


/**
 * Checks if user has valid jwt from google and upserts user into db
 */
app.post('/signin', async function(req, res) {

    const googleJwt = await googleAuth(req.body.googleJwt);

    if (googleJwt) {

        let [firstName, lastName]: string[] = googleJwt.name.split(' ');

        const userInfo = await addUserToDb({
            googleId: googleJwt.sub,
            email: googleJwt.email,
            firstName,
            lastName
        });


        const jwtInfo = {
            id: userInfo._id.toString() as string,
            email: userInfo.email as string,
            firstName,
            lastName,
            admin: userInfo._id.toString() == config.admin
        };

        // now switching to own jwt, don't want to be so tied to google
        const jwt = jsonwebtoken.sign(jwtInfo, config.jwtSecret, {
            expiresIn: '1h',
            subject: jwtInfo.id.toString()
        });

        return res.send(jwt);
    }
    else {

       res.end();
    }
});

// app.use(function(req, res, next) {

//     interface jwt {
//         firstName: string;
//         lastName: string;
//         id: string;
//         email: string;
//     }

//     const token = (req.get("authorization") || '').split('Bearer ')[1];

//     if (req.body.query &&
//         req.body.query.indexOf('mutation') !== -1 &&
//         (!token || (jsonwebtoken.verify(token, config.jwtSecret) as jwt).id != config.admin)) {

//         return res.status(400).end();
//     }
//     else {

//         next();
//     }
// });

app.use('/api', graphqlExpress({schema}))

app.listen(4000);
