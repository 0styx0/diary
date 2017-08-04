// import * as jsonwebtoken from 'jsonwebtoken';
import config from '../../config';
// import * as atob from 'atob';



var GoogleAuth = require('google-auth-library');



// only doing fields I'm using, not all fields that are there
interface googleJWT {
    aud: string; // google client id
    iss: string; // time
    name: string;
    email: string;
    sub: string; // google's unique id for that user
    email_verified: boolean;
}

async function authenticate(token: string): Promise<googleJWT | null> {

    if (!token) {
        return null;
    }

    const keyToUse = JSON.parse(atob(token.split('.')[0])).kid;

    const jwt = <googleJWT> await jsonwebtoken.verify(token, config.googleJWTCerts[keyToUse], {algorithms: ['RS256']});

    if (jwt.email_verified && jwt.aud === config.googleClientId &&
        ['accounts.google.com', 'https://accounts.google.com'].indexOf(jwt.iss) !== -1) {

            return jwt;

    }
    else {

        return null;
    }
}

export default authenticate;