import db from './connection';
import * as dbTypes from './dbTypes';

import {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql';




const comments = new GraphQLObjectType({
    name: 'Comments',
    description: 'Comments on the post',
    fields: () => ({
    content: {type: new GraphQLNonNull(GraphQLString)},
    created: {type: new GraphQLNonNull(GraphQLString)},
    author: {type: new GraphQLNonNull(GraphQLString)}
    })
});



const TextPostType = new GraphQLObjectType({
    name: 'TextPost',
    description: 'This is a text only post',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        created: {type: new GraphQLNonNull(GraphQLString)},
        comments: {type: new GraphQLList(comments)},
    })
});

const VideoPostType = new GraphQLObjectType({
    name: 'VideoPost',
    description: 'This is a video',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {
            type: new GraphQLList(new GraphQLNonNull(GraphQLString))
        },
        created: {type: new GraphQLNonNull(GraphQLString)}
    })
});


interface title {
    title: string
}

const PostRootType = new GraphQLObjectType({
    name: 'PostSchema',
    description: 'Diary Schema Root',
    fields: () => ({
        textPosts: {
            type: new GraphQLList(TextPostType),
            description: 'Text posts',
            args: {
                title: {type: GraphQLString},
            },
            resolve: function(_, args: title) {

                return db.models.textPosts.find(args)
            }
        },
        videoPosts: {
            type: new GraphQLList(VideoPostType),
            description: 'Video posts',
            args: {
                title: {type: GraphQLString}
            },
            resolve: function(_, args: title) {

                return db.models.videoPosts.find(args)
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutatation',
    description: 'Mutate collections',
    fields: ()  => ({
        addTextPost: {
            type: TextPostType,
            description: 'Add text posts',
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: function(_, args: dbTypes.textPosts) {
                return new db.models.textPosts(args).save();
            }
        }
    })
})

const PostSchema = new GraphQLSchema({
    query: PostRootType,
    mutation: Mutation
});

export default PostSchema;
