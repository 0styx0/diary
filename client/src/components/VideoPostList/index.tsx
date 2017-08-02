import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import TextPost from '../TextPost';
import { VideoPostQuery, VideoPostDeletion } from '../../graphql/videoPosts/';

interface TextPost {
    title: string;
    content: string;
    created: Date;
    id: string;
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

        const data = this.props.data;

        if (!data.videoPosts) {
            return null;
        }

        return (
            <div className="postListContainer">
                <div>
                    {data.videoPosts.map((post: TextPost, j: number) =>

                        <div key={j}>
                            <TextPost
                                title={post.title}
                                content={
                                    '<embed width="320" height="240" src="' + post.content + '" allowfullscreen />'
                                }
                                created={post.created}
                                onDelete={(e) =>

                                    this.props.deleteVideoPostMutation({
                                        variables: {
                                            id: post.id
                                        }
                                    })
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const ImageAlbumPostListWithData = compose(
    graphql(VideoPostQuery),
    graphql(VideoPostDeletion, {name: 'deleteVideoPostMutation'})
)(VideoPostList as any);

export default ImageAlbumPostListWithData;