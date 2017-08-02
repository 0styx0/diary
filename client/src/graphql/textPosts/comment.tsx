import { gql } from 'react-apollo';

const TextPostCommentCreation = gql`
    mutation addTextPostComment($postId: String!, $authorId: String!, $content: String!) {
        addTextPostComment(postId: $postId, authorId: $authorId, content: $content) {
            id
        }
    }`;

const TextPostCommentDeletion = gql`
    mutation deleteTextPostComment($postId: String!, $commentId: String!) {
        deleteTextPostComment(postId: $postId, commentId: $commentId) {
            id
        }
    }`;

export { TextPostCommentDeletion, TextPostCommentCreation };