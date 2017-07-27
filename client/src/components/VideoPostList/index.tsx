import * as React from 'react';
import { graphql } from 'react-apollo';
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
}

function VideoPostList(props: Props) {

    const data = props.data;

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
                                content={'<embed width="320" height="240" src="'+post.content +'" allowfullscreen />'}
                                created={post.created}
                            />
                        </div>
                    )
                }
                )}
              </div>
            </div>
            );
}

const VideoPostQuery = gql`
    query VideoPostQuery {
        videoPosts {
            title,
            created,
            content
        }
    }
`;

const ImageAlbumPostListWithData = (graphql(VideoPostQuery) as any)(VideoPostList);
export default ImageAlbumPostListWithData;