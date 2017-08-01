import db from './connection';
import * as dbTypes from './dbTypes';
import {sanitize} from './helpers/sanitize';
import {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql';



// subdocument of TextPostType
const CommentType = new GraphQLObjectType({
    name: 'Comments',
    description: 'Comments on the post',
    fields: () => ({
        content: {type: new GraphQLNonNull(GraphQLString)},
        created: {type: new GraphQLNonNull(GraphQLString)},
        id: {type: new GraphQLNonNull(GraphQLString)},
        author: {
            type: new GraphQLNonNull(UserType),
            resolve: async function(comment: dbTypes.comments) {

                return await db.models.users.findById(comment.authorId);
            }
        }
    })
});



const TextPostType = new GraphQLObjectType({
    name: 'TextPost',
    description: 'This is a text only post',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        created: {type: new GraphQLNonNull(GraphQLString)},
        comments: {type: new GraphQLList(CommentType)},
    })
});

const VideoPostType = new GraphQLObjectType({
    name: 'VideoPost',
    description: 'This is a video',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {
            type: new GraphQLNonNull(GraphQLString)
        },
        created: {type: new GraphQLNonNull(GraphQLString)}
    })
});

// TODO: Add alt attribute
const ImageAlbumType = new GraphQLObjectType({
    name: 'ImageAlbumPost',
    description: 'A list of image urls',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
        },
        created: {type: new GraphQLNonNull(GraphQLString)}

    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        googleId: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        lastName: {type: new GraphQLNonNull(GraphQLString)}
    })
})


interface title {
    title: string
}

interface user {
    googleId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}



const PostRootType = new GraphQLObjectType({
    name: 'PostSchema',
    description: 'Diary Schema Root',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'Users',
            args: {
                googleId: {type: GraphQLString},
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
                email: {type: GraphQLString}
            },
            resolve: function(_, args: user) {
                db.models.users.find(sanitize(args));
            }
        },
        textPosts: {
            type: new GraphQLList(TextPostType),
            description: 'Text posts',
            args: {
                title: {type: GraphQLString},
            },
            resolve: function(_, args: title) {

                return db.models.textPosts.find(sanitize(args))
            }
        },
        videoPosts: {
            type: new GraphQLList(VideoPostType),
            description: 'Video posts',
            args: {
                title: {type: GraphQLString}
            },
            resolve: function(_, args: title) {

                return db.models.videoPosts.find(sanitize(args))
            }
        },
        imageAlbumPosts: {
            type: new GraphQLList(ImageAlbumType),
            description: 'Image albums',
            args: {
                title: {type: GraphQLString}
            },
            resolve: function(_, args: title) {
                return db.models.imageAlbums.find(sanitize(args));
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
                const newPost: dbTypes.textPosts = sanitize(args);

                return new db.models.textPosts(newPost).save();
            }
        },
        updateTextPost: {
            type: TextPostType,
            description: 'Update text post content and title',
            args: {
                title: {
                    type: GraphQLString
                },
                content: {
                    type: GraphQLString
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function(_, args: {id: string}) {
                const update = sanitize(args);

                return db.models.textPosts.findOneAndUpdate(args.id, update, {new: true, runValidators: true});
            }
        },
        addTextPostComment: {
            type: CommentType,
            description: 'Comment on text posts',
            args: {
                postId: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function(_, args: {postId: string, authorId: string, content: string}) {

                const sanitized = sanitize(args);

                return db.models.textPosts.findByIdAndUpdate(sanitized.postId, {
                    $push: {
                        comments: {
                            authorId: sanitized.authorId,
                            content: sanitized.content
                        }
                    }
                },
                {
                    new: true
                });

            }
        },
        deleteTextPostComment: {
            type: CommentType,
            description: 'Delete a comment',
            args: {
                commentId: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                postId: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function(_, args: {commentId: string, postId: string}) {

                const sanitized = sanitize(args);

                return db.models.textPosts.findByIdAndUpdate(sanitized.postId, {
                    $pull: {
                        comments: {
                            _id: sanitized.commentId,
                        }
                    }
                });
            }
        },
        deleteTextPost: {
            type: TextPostType,
            description: 'Delete a text post',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function(_, args: {id: string}) {

                return db.models.textPosts.findByIdAndRemove(sanitize(args.id));
            }
        },
        addVideoPost: {
            type: VideoPostType,
            description: 'Add videos',
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                content: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function(_, args: dbTypes.videoPosts) {

               const newPost: dbTypes.videoPosts = sanitize(args);

               // youtube's private mode
               newPost.content = newPost.content.toString().replace(/\/\/(www.)?youtube\.com/, '//www.youtube-nocookie.com') as any;

               return new db.models.videoPosts(newPost).save();
            }
        },
        deleteVideoPost: {
            type: VideoPostType,
            description: 'Delete videos',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function(_, args: {id: string}) {

                return db.models.videoPosts.findByIdAndRemove(sanitize(args.id));
            }
        },
        addImageAlbumPost: {
            type: ImageAlbumType,
            description: 'Add image albums',
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                content: {
                    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString)))
                }
            },
            resolve(_, args: dbTypes.imageAlbum) {

                const newPost: dbTypes.imageAlbum = sanitize(args);
                return new db.models.imageAlbums(newPost).save();
            }
        },
        deleteImageAlbumPost: {
            type: ImageAlbumType,
            description: 'Delete image album',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function(_, args: {id: string}) {

                return db.models.imageAlbums.findByIdAndRemove(sanitize(args.id));
            }
        }

    })
})

const PostSchema = new GraphQLSchema({
    query: PostRootType,
    mutation: Mutation
});

export default PostSchema;
