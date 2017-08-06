import * as React from 'react';
import Container from '../../components/Container';
import TextPostList from '../../components/TextPostList/';
import './index.css';

function TextPosts() {

    return (
            <Container className="textPosts" heading="Text Posts">
                <TextPostList />
            </Container>
            );
}

export default TextPosts;