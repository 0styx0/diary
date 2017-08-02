import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import TextPost from '../TextPost';
import { ImageAlbumPostQuery, ImageAlbumPostDeletion } from '../../graphql/imageAlbums/';

interface TextPost {
    title: string;
    content: [string];
    created: Date;
    id: string;
}

interface Props {
    data: {
        loading: boolean,
        error: Object,
        imageAlbumPosts: [TextPost]
    };
    deleteImageAlbumPostMutation: Function;
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

                    post.content.forEach((url: string) => src += '<img src="' + url + '" />');

                    return (
                        <div key={j}>
                            <TextPost
                                title={post.title}
                                content={src}
                                created={post.created}
                                onDelete={() =>

                                    props.deleteImageAlbumPostMutation({
                                        variables: {
                                            id: post.id
                                        }
                                    })
                                }
                            />
                        </div>
                    );
                })}
              </div>
            </div>
            );
}

const ImageAlbumPostListWithData = compose(
    graphql(ImageAlbumPostQuery),
    graphql(ImageAlbumPostDeletion, {name: 'deleteImageAlbumPostMutation'})
)(ImageAlbumPostList as any);

export default ImageAlbumPostListWithData;