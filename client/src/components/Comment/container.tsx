import * as React from 'react';
import { graphql, gql } from 'react-apollo';

import Comment from './';

interface Props {
    author: string;
    created: Date;
    content: string;
    id: string;
    postId: string;
    mutate: Function;
}

class CommentContainer extends React.Component<Props, {}> {

    onDelete = () => {

        this.props.mutate({
            variables: {
                commentId: this.props.id,
                postId: this.props.postId
            }
        });
    }

    render() {
        return (
            <Comment
                onDelete={this.onDelete}
                created={this.props.created}
                content={this.props.content}
                author={this.props.author}
            />
        );
    }
}

const deleteTextPostCommentMutation = gql`
    mutation deleteTextPostComment($postId: String!, $commentId: String!) {
        deleteTextPostComment(postId: $postId, commentId: $commentId) {
            id
        }
    }`;

const CommentContainerWithMutation = (graphql(deleteTextPostCommentMutation) as any)(CommentContainer);

export default CommentContainerWithMutation;