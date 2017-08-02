import * as React from 'react';
import Container from '../../components/Container';
import VideoPostList from '../../components/VideoPostList/';

function ImageAlbumPosts() {

    return (
          <Container heading="Videos">
             <VideoPostList />
          </Container>
    );
}

export default ImageAlbumPosts;