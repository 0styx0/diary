
/**
 * @return jwt's payload in JSON from sessionStorage
 */
export default function getJWT() {

    const tokenString = window.sessionStorage.getItem('jwt');

    if (!tokenString) {
        return {};
    }

    const encodedPayload = tokenString.split('.')[1];

    const decodedPayload = atob(encodedPayload);

    return JSON.parse(decodedPayload);
}