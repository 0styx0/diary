interface textPosts {
    title: string,
    content: string,
    created?: Date,
    comments?: [comments]
    [key: string]: string | Date | undefined | [comments]
}

interface comments {
    authorId: string,
    content: string,
    created: Date
}

interface videoPosts {
    title: string,
    content: URL,
    created?: Date
}

interface imageAlbum {
    title: string,
    content: Array<URL>
    created?: Date
}

interface user {
    firstName: string;
    lastName: string;
    googleId: string;
    email: string;
}

export {textPosts, videoPosts, imageAlbum, user, comments}