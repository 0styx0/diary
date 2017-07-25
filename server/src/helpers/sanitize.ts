import * as sanitizeHTML from 'sanitize-html';


const sanitizeOptions = {

    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                 'blockquote', 'p', 'a',
                 'ul', 'ol', 'li',
                  'i', 'strong', 'em', 'strike', 'code', 'br', 'div',
                 'caption', 'pre' ],
    allowedAttributes: {
        a: [ 'href' ],
        img: [ 'src', 'alt' ]
    },
    selfClosing: [ 'img', 'br' ],
    allowedSchemes: [ 'http', 'https', 'mailto' ],
    '*': ['class'],
    transformTags: {
        'b': 'strong',
        'i': 'em'
    }
}


/**
 * @return sanitized version of toSanitize
 */
export function sanitize(toSanitize: any) {


    if (typeof toSanitize !== 'object') {
        return sanitizeHTML(toSanitize, sanitizeOptions, null);
    }

    const sanitized: any = {};

    return recursiveSanitize(toSanitize);


    function recursiveSanitize(obj: any) {

        for (const key in obj) {

            const elt = obj[key];

            if (typeof elt !== 'object'){
                sanitized[key] = sanitizeHTML(elt, sanitizeOptions, null);
            }
            else {
                sanitized[key] = recursiveSanitize(elt);
            }
        }
        return sanitized;
    }
}