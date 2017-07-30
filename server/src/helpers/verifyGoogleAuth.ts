import * as jwtSimple from 'jwt-simple';
// const config = require('./../../../config.js');
import db from '../connection';
import * as dbTypes from '../dbTypes';
import {sanitize} from './sanitize';
const config = {
    googleClientId: "sd",
    googlePublicKey: "d"
}

function addUserToDb(user: dbTypes.user) {

    const sanitizedUser = sanitize(user);

    db.models.users.findOneAndUpdate(
        {
            googleId: sanitizedUser.googleId
        },
        sanitizedUser,
        {
            upsert: true,
            runValidators: true,
            new: true
        }
    )
}

function authenticate(token: string, googleId: string) {

    const jwt = jwtSimple.decode(token, config.googlePublicKey, false, 'RS256')[1]; // get body of jwt

    if (jwt.aud === config.googleClientId &&
        ['accounts.google.com', 'https://accounts.google.com'].indexOf(jwt.iss) !== -1) {

            let {firstName, lastName} = jwt.name.split(' ');

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