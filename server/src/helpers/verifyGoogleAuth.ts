import * as jsonwebtoken from 'jsonwebtoken';
const config = require('json!./../../../config.json');
import * as atob from 'atob';
import db from '../connection';
import * as dbTypes from '../dbTypes';
import {sanitize} from './sanitize';

async function addUserToDb(user: dbTypes.user) {

    const sanitizedUser = sanitize(user);

    await db.models.users.findOneAndUpdate(
        {
            googleId: sanitizedUser.googleId
        },
        sanitizedUser,
        {
            upsert: true,
            runValidators: true,
            new: true
        }
    );
}


// only doing fields I'm using, not all fields that are there
interface googleJWT {
    aud: string;
    iss: string;
    name: string;
    email: string;
}

async function authenticate(token: string, googleId: string) {


    const keyToUse = JSON.parse(atob(token.split('.')[0])).kid;

    const jwt = <googleJWT> await jsonwebtoken.verify(token, config.googleJWTCerts[keyToUse], {algorithms: ['RS256']});

    if (jwt.aud === config.googleClientId &&
        ['accounts.google.com', 'https://accounts.google.com'].indexOf(jwt.iss) !== -1) {

            let [firstName, lastName] = jwt.name.split(' ');

            return addUserToDb({
                firstName,
                lastName,
                email: jwt.email,
                googleId
            });
    }
    else {

        return null;
    }
}

export default authenticate;