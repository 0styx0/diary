import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TextPost from '../TextPost';

interface TextPost {
    title: string;
    content: string;
    created: Date;
}

interface Props {
    data: {
        loading: boolean,
        error: Object,
        videoPosts: [TextPost]
    };
    deleteVideoPostMutation: Function;
}

class VideoPostList extends React.Component<Props, {}> {

    constructor() {
        super();
        // this.deletePost = this.deletePost.bind(this);
    }

    render() {

console.log(this.props)
        const data = this.props.data;

        if (data.loading) {
            return null;
        }

        return (
            <div className="postListContainer">
                <div>
                    {data.videoPosts.map((post: TextPost, j: number) => {

                        return (
                            <div key={j}>
                                <TextPost
                                    title={post.title}
                                    content={
                                        '<embed width="320" height="240" src="' + post.content + '" allowfullscreen />'
                                    }
                                    created={post.created}
                                    onDelete={(e) => {

                                        e.stopPropagation();


                                        this.props.deleteVideoPostMutation({
                                            variables: {
                                                id: post['id']
                                            }
                                        });
                                        console.log(post['id'])
                                    }}
                                />
                            </div>
                        );
                    }
                    )}
                </div>
            </div>
        );
    }
}

const deleteVideoPostMutation = gql`
    mutation deleteVideoPost($id: String!) {
        deleteVideoPost(id: $id) {
            id
        }
    }`;

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

const ImageAlbumPostListWithData = compose(
    graphql(VideoPostQuery),
    graphql(deleteVideoPostMutation, {name: 'deleteVideoPostMutation'})
)(VideoPostList as any);

export default ImageAlbumPostListWithData;