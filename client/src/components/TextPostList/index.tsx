import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextPost from '../TextPost';

import './index.css';

interface TextPost {
    title: string;
    content: string;
    created: Date;
    comments?: Array<{
        content: string;
        created: Date;
        author: {
            firstName: string;
            lastName: string;
        }
    }>
}

interface Props {
    data: {
        loading: boolean,
        error: Object,
        textPosts: [TextPost]
    };
    deleteTextPostMutation: Function;
}

function TextPostList(props: Props) {

    const data = props.data;

    if (data.loading) {
        return null;
    }

    return (
            <div className="postListContainer"><div>
                {data.textPosts.map((post: TextPost, i: number) =>
                    <TextPost
                        key={i}
                        title={post.title}
                        content={post.content}
                        created={post.created}
                        comments={post.comments}
                        onDelete={() =>

                            props.deleteTextPostMutation({
                                variables: {
                                    id: post['id']
                                }
                            })
                        }
                    />)}
            </div></div>
            );
}

const deleteTextPostMutation = gql`
    mutation deleteTextPost($id: String!) {
        deleteTextPost(id: $id) {
            id
        }
    }`;


const TextPostQuery = gql`
    query TextPostQuery {
        textPosts {
            title,
            created,
            content,
            id
            comments {
                content,
                created,
                author {
                    firstName,
                    lastName
                }
            }
        }
    }
`;

const TextPostListWithData = compose(
    graphql(TextPostQuery),
    graphql(deleteTextPostMutation, {name: 'deleteTextPostMutation'})
)(TextPostList as any);

export default TextPostListWithData;