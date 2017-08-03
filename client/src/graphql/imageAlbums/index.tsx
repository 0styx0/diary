import { gql } from 'react-apollo';

const ImageAlbumPostQuery = gql`
    query ImageAlbumPostQuery {
        imageAlbumPosts {
            title,
            created,
            content,
            id
        }
    }
`;

const ImageAlbumPostCreation = gql`
    mutation createAlbumPost($title: String!, $content: [String!]!) {
        addImageAlbumPost(title: $title, content: $content) {
            id
            title
            content
            created
        }
    }`;

const ImageAlbumPostDeletion = gql`
    mutation deleteImageAlbumPost($id: String!) {
        deleteImageAlbumPost(id: $id) {
            id
        }
    }`;

export { ImageAlbumPostQuery, ImageAlbumPostCreation, ImageAlbumPostDeletion };