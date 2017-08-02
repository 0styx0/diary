import { gql } from 'react-apollo';

interface TextPostType {
    title: string;
    content: string;
    created: Date;
    id: string;
    comments?: Array<{
        content: string;
        created: Date;
        id: string;
        author: {
            firstName: string;
            lastName: string;
        }
    }>;
}

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
                id
                author {
                    firstName,
                    lastName
                }
            }
        }
    }
`;

const TextPostCreation = gql`
    mutation createTextPost($title: String!, $content: String!) {
        addTextPost(title: $title, content: $content) {
            title,
            created,
            content,
            id
            comments {
                content,
                created,
                id
                author {
                    firstName,
                    lastName
                }
            }
        }
    }`;

const TextPostDeletion = gql`
    mutation deleteTextPostComment($postId: String!, $commentId: String!) {
        deleteTextPostComment(postId: $postId, commentId: $commentId) {
            id
        }
    }`;

export { TextPostQuery, TextPostCreation, TextPostDeletion, TextPostType };