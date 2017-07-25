interface textPosts {
    title: string,
    content: string,
    created?: Date,
    comments?: [comments]
    [key: string]: string | Date | undefined | [comments]
}

interface comments {
    author: string,
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

export {textPosts, videoPosts, imageAlbum}