const  mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/diary';


mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))



export default db;


db.once('open', () => {


   const urlType = {
                    type: String,
                    match: /^https?:\/\//,
                    unique: true
                };

    const commentSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now,
            required: true
        }
    });

    const textPostSchema = new mongoose.Schema({
            title: {
                type: String,
                unique: true,
                required: [true, 'Post must have a title']
            },
            content: {
                type: String,
                required: true
            },
            created: {
                type: Date,
                default: Date.now,
                required: true
            },
            comments: [commentSchema],
    });

    const videoPostSchema = new mongoose.Schema({
        title: {
            type: String,
            unique: true,
            required: true
        },
        created: {
            type: Date,
            default: Date.now,
            required: true,
        },
        content: urlType
    })

    const imageAlbumSchema = new mongoose.Schema({

            title: {
                type: String,
                required: true
            },
            created: {
                type: Date,
                default: Date.now,
                required: true
            },
            content: {
                required: true,
                type: [urlType],
            }

    });

    mongoose.model('textPosts', textPostSchema);
    mongoose.model('videoPosts', videoPostSchema);
    mongoose.model('imageAlbums', imageAlbumSchema);

    /*
    textPost.insertMany([{
            title: 'Goodbye',
            content: 'Anther post',
            comments: [
                {
                    content: 'Hey!!!!!!',
                    author: 'Goodman',
                }, {
                    content: 'wheeeeeee',
                    author: 'Growl',
                }
            ]
        },
        {
            title: 'Hello',
            content: 'This is the content of the post',
            created: new Date(),
    }])


        new videoPost({
            title: 'video',
            created: new Date(),
            content: 'https://safasfsafsad.org'
        }).save()

        new imageAlbum({
            title: 'My Album',
            created: new Date(),
            content: ['https://safasfsafsad.org']
        }).save();
        */
});