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

export { TextPostQuery, TextPostType };