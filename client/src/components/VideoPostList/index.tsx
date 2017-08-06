import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import TextPost from '../TextPost';
import { VideoPostQuery, VideoPostDeletion } from '../../graphql/videoPosts/';
import Graphql from '../../helpers/graphql';

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

function VideoPostList(props: Props) {

    if (!props.data.videoPosts) {
        return null;
    }

    return (
        <div className="postListContainer">
            <div>
                {props.data.videoPosts.map((post: TextPost, j: number) =>

                    <div key={j}>
                        <TextPost
                            title={post.title}
                            content={
                                '<embed width="320" height="240" src="' + post.content + '" allowfullscreen />'
                            }
                            created={post.created}
                            onDelete={(e) =>

                                props.deleteVideoPostMutation({
                                    variables: {
                                        id: post.id
                                    },
                                    update(store, { data }) {

                                        Graphql.removeFromStore(store, data.deleteVideoPost.id, VideoPostQuery);
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

const ImageAlbumPostListWithData = compose(
    graphql(VideoPostQuery),
    graphql(VideoPostDeletion, {name: 'deleteVideoPostMutation'})
)(VideoPostList as any);

export default ImageAlbumPostListWithData;