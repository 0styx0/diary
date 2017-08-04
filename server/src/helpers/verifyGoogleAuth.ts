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

async function authenticate(token: string): Promise<googleJWT> {

        var auth = new GoogleAuth;
        var client = new auth.OAuth2(config.googleClientId, '', '');

        const payload = await new Promise((resolve: Function, reject: Function) => {

            client.verifyIdToken(
                token,
                config.googleClientId,

                function(e: any, login: {getPayload: Function}) {

                    if (login && login.getPayload().email_verified) {

                        resolve(login.getPayload() as googleJWT);
                    }
                    else {

                        reject('Invalid token');
                    }
                }
            );
        });

        return payload as googleJWT;
}

export default authenticate;