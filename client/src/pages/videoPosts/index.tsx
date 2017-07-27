import * as React from 'react';
import Container from '../../components/Container';
import VideoPostList from '../../components/VideoPostList/';


function ImageAlbumPosts() {

    return <Container
             heading="Videos"
             children={<VideoPostList />}
           />
}

export default ImageAlbumPosts;