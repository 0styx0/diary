import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import './index.css';

interface Props {
    mutate: Function;
}



class CreateTextPost extends React.Component<Props, {}> {

    constructor() {
        super();

        this.setProgress = this.setProgress.bind(this);
        this.save = this.save.bind(this);

        this.state = {
            title: '',
            content: ''
        };
    }

    setProgress(e: any) {

        const replacement = {};

        const elt = e.target as HTMLInputElement | HTMLTextAreaElement;

        replacement[elt.name] = elt.value;

        this.setState(replacement);
    }

    save(e: any) {

        e.preventDefault();
        e.stopPropagation();

        this.props.mutate({variables: this.state});
    }

    render() {

        return (
            <form onSubmit={this.save}>
              <input
                type="text"
                name="title"
                onBlur={this.setProgress}
                required={true}
              />
              <textarea
                name="content"
                onBlur={this.setProgress}
                required={true}
              />
              <input type="submit" />
            </form>
        );
    }
}

const createTextPostMutation = gql`
    mutation createTextPost($title: String!, $content: String!) {
        addTextPost(title: $title, content: $content) {
            id
            title
            content
        }
    }`;

const updateTextPostMutation = gql`
    mutation updatePost($title: String, $content: String) {
        updateTextPost(title: $title, content: $content) {
            id
            title
            content
        }
    }
`;

const CreateTextPostWithMutation = (graphql(createTextPostMutation) as any)(
    (graphql(updateTextPostMutation) as any)(CreateTextPost)
);

export default CreateTextPostWithMutation;