import db from './connection';

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
})

const TextPostType = new GraphQLObjectType({
    name: 'TextPost',
    description: 'This is a text only post',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        created: {type: new GraphQLNonNull(GraphQLString)},
        comments: {type: new GraphQLList(comments)}
    })
});

const VideoPostType = new GraphQLObjectType({
    name: 'VideoPost',
    description: 'This is a video',
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {
            type: new GraphQLNonNull(GraphQLString)
        },
        created: {type: new GraphQLNonNull(GraphQLString)}
    })
});


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
            resolve: function() {
                return db.models.textPosts.find()
            }
        },
        videoPosts: {
            type: new GraphQLList(VideoPostType),
            description: 'Video posts',
            resolve: function() {

                return db.models.videoPosts.find()
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutatation',
    description: 'Mutate a text post',
    fields: ()  => ({
        addPost: {
            type: TextPostType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
        }
    })
})

const PostSchema = new GraphQLSchema({
    query: PostRootType,
    mutation: Mutation
});

export default PostSchema;
