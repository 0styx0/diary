import * as React from 'react';
import Container from '../../components/Container';

interface Props {
    data: {
        loading: boolean,
        error: Object,
        textPosts: Object
    };
}

class Index extends React.Component<Props, {}> {

    render() {

        return (
            <Container heading="Main Page" />
        );
    }
}

export default Index;