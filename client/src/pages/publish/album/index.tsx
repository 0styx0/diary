import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

interface Props {
    mutate: Function;
}

interface State {
    inputs: string[]; // should be HTMLInputElement[] but ts throws errors when I do that
    title: string;
}

class CreateAlbumPost extends React.Component<Props, State> {

    constructor() {
        super();

        this.addInput = this.addInput.bind(this);
        this.saveToDb = this.saveToDb.bind(this);
        this.saveUrlProgress = this.saveUrlProgress.bind(this);

        this.state = {
            inputs: [''],
            title: ''
        };
    }

    addInput() {

        this.setState({
            inputs: this.state.inputs.concat([''])
        });
    }

    saveUrlProgress(e: any) {

        const inputs = this.state.inputs.slice();

        inputs[e.target.dataset.index] = e.target.value;

        this.setState({
            inputs
        });
    }

    saveToDb(e: any) {

        e.preventDefault();
        e.stopPropagation();

        this.props.mutate({
            variables: {
                content: this.state.inputs,
                title: this.state.title
            }
        });
    }

    render() {

        return (
               <form onSubmit={this.saveToDb}>
                 <label>
                   Title
                   <input type="text" onChange={(e: any) => this.setState({title: e.target.value})}/>
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

const createAlbumPostMutation = gql`
    mutation createAlbumPost($title: String!, $content: [String!]!) {
        addImageAlbumPost(title: $title, content: $content) {
            id
            title
            content
        }
    }`;

const CreateAlbumPostWithMutation = (graphql(createAlbumPostMutation) as any)(CreateAlbumPost);

export default CreateAlbumPostWithMutation;