import { gql } from 'react-apollo';

const VideoPostQuery = gql`
    query VideoPostQuery {
        videoPosts {
            title,
            created,
            content,
            id
        }
    }
`;

const VideoPostCreation = gql`
    mutation createVideoPost($title: String!, $content: String!) {
        addVideoPost(title: $title, content: $content) {
            id
            title
            content
        }
    }`;

const VideoPostDeletion = gql`
    mutation deleteVideoPost($id: String!) {
        deleteVideoPost(id: $id) {
            id
        }
    }`;

export { VideoPostQuery, VideoPostCreation, VideoPostDeletion };