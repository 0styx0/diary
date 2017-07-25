interface Database {

    textEntries: {
        title: string,
        content: string,
        created: Date,
        comments: {
            author: string,
            content: string,
            created: Date
        }
    },
    videoEntries: {
        title: string,
        content: URL,
        created: Date
    },
    imageAlbum: {
        title: string,
        content: Array<URL>
        created: Date
    }
}