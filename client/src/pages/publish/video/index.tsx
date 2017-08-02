import * as React from 'react';

import { graphql } from 'react-apollo';
import { VideoPostCreation } from '../../../graphql/videoPosts/';

import withSaving from '../withSaving';

interface Props {
    mutate: Function;
    progressSaver: {
        onInput: (e: any) => null
    };
    dbSaver: any;
}

interface State {
    title: string;
    content: string;
}

class CreateVideoPost extends React.Component<Props, State> {

    constructor() {

        super();

        this.state = {
            title: '',
            content: ''
        };
    }

    render() {

        return (
            <form onSubmit={this.props.dbSaver}>
                <input type="text" name="title" {...this.props.progressSaver} />
                <input type="text" name="content" {...this.props.progressSaver} />
                <input type="submit" />
            </form>
            );
    }
}

const CreateVideoPostWithMutation = (graphql(VideoPostCreation) as any)(withSaving(CreateVideoPost, {
    graphqlSaveMethod: 'mutate'
}));

export default CreateVideoPostWithMutation;