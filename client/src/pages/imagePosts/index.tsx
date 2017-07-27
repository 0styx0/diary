import * as React from 'react';
import Container from '../../components/Container';
import ImagePostList from '../../components/ImagePostList/';


function ImageAlbumPosts() {

    return <Container
             heading="Image Albums"
             children={<ImagePostList />}
           />
}

export default ImageAlbumPosts;