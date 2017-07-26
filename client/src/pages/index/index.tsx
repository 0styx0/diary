import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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

const TextPostQuery = gql`
    query TextPostQuery($title: String) {
        textPosts(title: $title) {
            _id,
            title,
            created
        }
    }
`;

const IndexWithData = (graphql(TextPostQuery, {
    options: {
        variables: {
            title: 'Goodbye'
        }
    }
}) as any)(Index);

export default IndexWithData;