
import * as dbTypes from '../dbTypes';
import {sanitize} from './sanitize';
import db from '../connection';

export default async function addUserToDb(user: dbTypes.user) {

    const sanitizedUser = sanitize(user);

    return await db.models.users.findOneAndUpdate(
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