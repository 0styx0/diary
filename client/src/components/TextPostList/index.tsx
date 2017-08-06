import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import TextPost from '../TextPost';
import Graphql from '../../helpers/graphql';
import './index.css';

import { TextPostQuery, TextPostDeletion, TextPostType } from '../../graphql/textPosts/';

interface Props {
    data: {
        loading: boolean,
        error: Object,
        textPosts: [TextPostType]
    };
    deleteTextPostMutation: Function;
}

function TextPostList(props: Props) {

    if (!props.data.textPosts) {
        return null;
    }

    return (
        <div className="postListContainer">
            <div>
                {props.data.textPosts.map((post: TextPostType, i: number) =>
                    <TextPost
                        key={i}
                        title={post.title}
                        content={post.content}
                        created={post.created}
                        id={post.id}
                        comments={post.comments}
                        onDelete={() => {

                            props.deleteTextPostMutation({
                                variables: {
                                    id: post.id
                                },
                                update(store, { data }) {

                                    Graphql.removeFromStore(store, data.deleteTextPost.id, TextPostQuery);
                                }
                            })
                        }}
                    />)}
            </div>
        </div>
    );
}

const TextPostListWithData = compose(
    graphql(TextPostQuery),
    graphql(TextPostDeletion, {name: 'deleteTextPostMutation'})
)(TextPostList as any);

export default TextPostListWithData;