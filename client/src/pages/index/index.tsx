import * as React from 'react';
import Container from '../../components/Container';

export default class Index extends React.Component<{}, {}> {

    render() {
        return (
                 <Container
                   heading="Main Page"
                   children={<h3>Another</h3>}
                 />
                );
    }
}