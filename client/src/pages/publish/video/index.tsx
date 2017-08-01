import * as React from 'react';

import { graphql, gql } from 'react-apollo';

interface Props {
    mutate: Function;
}

interface State {
    title: string;
    content: string;
}

class CreateVideoPost extends React.Component<Props, State> {

    constructor() {

        super();

        this.saveProgress = this.saveProgress.bind(this);
        this.saveToDB = this.saveToDB.bind(this);

        this.state = {
            title: '',
            content: ''
        };
    }

    saveProgress(e: any) {

        const newState = {};

        newState[e.target.name] = (e.target as HTMLInputElement).value;

        this.setState(newState);
    }

    saveToDB(e: any) {

        e.preventDefault();
        e.stopPropagation();

        this.props.mutate({variables: {
            title: this.state.title,
            content: this.state.content
        }});
    }

    render() {

        return (
            <form onSubmit={this.saveToDB}>
                <input type="text" name="title" onInput={this.saveProgress} />
                <input type="text" name="content" onInput={this.saveProgress} />
                <input type="submit" />
            </form>
            );
    }
}

const createVideoPostMutation = gql`
    mutation createVideoPost($title: String!, $content: String!) {
        addVideoPost(title: $title, content: $content) {
            id
            title
            content
        }
    }`;

const CreateVideoPostWithMutation = (graphql(createVideoPostMutation) as any)(CreateVideoPost);

export default CreateVideoPostWithMutation;