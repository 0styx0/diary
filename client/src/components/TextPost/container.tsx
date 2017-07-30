/*import * as React from 'react';
import TextPost from './';
/*
interface Props {
    title: string;
    content: string;
    created: Date;
    id: string;
    mutate: Function;
}

class deleteTextPostMutation extends React.Component {

    onDelete() {
        this.props.mutate({
            id: this.props.id
        });
    }

    render() {

        return <TextPost {...this.props} onDelete={this.delete} />;
    }
}
/*
const deleteTextPostMutation = gql`
    mutation deleteTextPost($title: String!, $content: [String!]!) {
        deleteTextPost(id: $id) {
            id
        }
    }`;

const TextPostWithMutation = (graphql(deleteTextPostMutation) as any)(deleteTextPostMutation);
export default TextPostMutation;*/