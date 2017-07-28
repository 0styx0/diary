const  mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = require("url");
const dbUrl = 'mongodb://localhost:27017/diary';
import * as isEmail from 'validator/lib/isEmail';

mongoose.connect(dbUrl, {useMongoClient: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))


export default db;

db.once('open', () => {

    const urlType = {
        type: String,
        unique: true,
        validate: {
            // url must have a path and a tld
            validator: (val: string) => url.parse(val).pathname.length > 1 && val.split('.').length > 1,
            message: 'Invalid URL: {VALUE}'
        },
    };

    const imageType = {
        type: String,
        unique: true,
        validate: {
            validator: function(val: string) {

                const urlChunks = val.split('.');

                return url.parse(val).pathname.length > 1 &&
                        urlChunks.length > 2 && // one . for tld, another for image
                        ["jpg", "jpeg", "png", "jif", "svg",
                        "tiff", "tif", "gif", "bmp", "webp"]
                        .indexOf(urlChunks[urlChunks.length - 1].toLowerCase()) !== -1
            },
            message: 'Invalid image URL: {VALUE}'
        },
    };

    const commentSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true,
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
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
                required: true,
                unique: true
            },
            created: {
                type: Date,
                default: Date.now,
                required: true
            },
            content: {
                required: true,
                type: [imageType],
            }

    });

    const userSchema = new mongoose.Schema({

        googleId: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
            match: /^\w+$/
        },
        lastName: {
            type: String,
            required: true,
            match: /^\w+$/
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: isEmail
            }
        }
    });

    userSchema.index({ firstName: 1, lastName: 1}, { unique: true });

    mongoose.model('textPosts', textPostSchema);
    mongoose.model('videoPosts', videoPostSchema);
    mongoose.model('imageAlbums', imageAlbumSchema);
    mongoose.model('users', userSchema);

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