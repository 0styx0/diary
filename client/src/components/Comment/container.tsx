import * as React from 'react';
import { graphql } from 'react-apollo';
import { TextPostCommentDeletion } from '../../graphql/textPosts/comment';
import { TextPostQuery } from '../../graphql/textPosts';
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
            },
            update: (store) => {

                const storage = store.readQuery({query: TextPostQuery}); // if post type is already in the cache

                storage.textPosts = storage.textPosts.filter(post => post.id !== this.props.postId);

                store.writeQuery({query: TextPostQuery, data: storage });
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

const CommentContainerWithMutation = (graphql(TextPostCommentDeletion) as any)(CommentContainer);

export default CommentContainerWithMutation;