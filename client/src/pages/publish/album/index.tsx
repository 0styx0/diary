import * as React from 'react';
import { graphql } from 'react-apollo';
import { ImageAlbumPostCreation, ImageAlbumPostQuery } from '../../../graphql/imageAlbums/';
import withSaving from '../withSaving';

interface Props {
    mutate: Function;
    progressSaver: {
        onInput: (e: any) => null
    };
    dbSaver: any;
    setHocState: Function;
}

interface State {
    inputs: string[]; // should be HTMLInputElement[] but ts throws errors when I do that
}

class CreateAlbumPost extends React.Component<Props, State> {

    constructor() {
        super();

        this.addInput = this.addInput.bind(this);
        this.saveUrlProgress = this.saveUrlProgress.bind(this);

        this.state = {
            inputs: ['']
        };
    }

    addInput() {

        this.setState({
            inputs: this.state.inputs.concat([''])
        });
    }

    // since the content isn't a string, not setting it directly from the hoc like all the other publish components
    saveUrlProgress(e: any) {

        const inputs = this.state.inputs.slice();

        inputs[e.target.dataset.index] = e.target.value;

        this.props.setHocState({
            content: inputs
        });

        this.setState({
            inputs
        });
    }

    render() {

        return (
               <form onSubmit={this.props.dbSaver}>
                 <label>
                   Title
                   <input type="text" name="title" {...this.props.progressSaver} />
                 </label>
                 {this.state.inputs.map((val: string, i: number) =>
                     <input
                       key={i}
                       data-index={i}
                       type="url"
                       onInput={this.saveUrlProgress}
                     />
                 )}
                 <button onClick={this.addInput} type="button">Add</button>
                 <input type="submit" />
               </form>
        );
    }
}

const CreateAlbumPostWithMutation = (graphql(ImageAlbumPostCreation) as any)(withSaving(CreateAlbumPost, {
    graphqlSaveMethod: 'mutate',
    graphqlQuery: ImageAlbumPostQuery,
}));

export default CreateAlbumPostWithMutation;