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
                 <Container
                   heading="Main Page"
                   children={<h3>Another</h3>}
                 />
                );
    }
}

export default Index;