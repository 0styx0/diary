import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextPost from '../TextPost';



interface TextPost {
    title: string;
    content: [string];
    created: Date;
}

interface Props {
    data: {
        loading: boolean,
        error: Object,
        imageAlbumPosts: [TextPost]
    };
}

function ImageAlbumPostList(props: Props) {

    const data = props.data;

    if (data.loading) {
        return null;
    }

    return (
            <div className="postListContainer">
              <div>
                {data.imageAlbumPosts.map((post: TextPost, j: number) => {

                    let src = '';

                    post.content.forEach((url: string) => src += "<img src='"+url+"' />");

                    return (
                        <div key={j}>
                            <TextPost
                                title={post.title}
                                content={src}
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

const ImageAlbumPostQuery = gql`
    query ImageAlbumPostQuery {
        imageAlbumPosts {
            title,
            created,
            content
        }
    }
`;

const ImageAlbumPostListWithData = (graphql(ImageAlbumPostQuery) as any)(ImageAlbumPostList);
export default ImageAlbumPostListWithData;