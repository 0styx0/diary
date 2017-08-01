import * as React from 'react';
import  EditableComment from './';
import getJWT from '../../../helpers/getJWT';
import { graphql, gql } from 'react-apollo';

import { markdown } from 'markdown';

interface Props {
    postId: string;
    mutate: Function;
}

interface State {
    mode:  'edit' | 'preview';
    content: string; // so when switch to preview don't lose everything
}

class EditableCommentContainer extends React.Component<Props, State> {

    constructor() {
        super();

        this.onSave = this.onSave.bind(this);
        this.onPreview = this.onPreview.bind(this);

        this.state = {
            mode: 'edit',
            content: ''
        };
    }

    onSave(e: Event) {

        this.props.mutate({
            variables: {
                postId: this.props.postId,
                authorId: getJWT().id,
                content: (e.target as HTMLButtonElement).parentElement!.querySelector('[contenteditable]')!.textContent
            }
        });
    }

    onPreview(e: Event) {

        const editElt = (e.target as HTMLButtonElement).parentElement!.querySelector('[contenteditable]');

        const mode = (this.state.mode === 'edit') ? 'preview' : 'edit';

        // save markdown before it gets changed to html
        const content = (mode === 'preview') ? editElt!.innerHTML : this.state.content;

        editElt!.innerHTML = (mode === 'preview') ? markdown.toHTML(content.replace(/<br>/gi, '\n')) : content;

        this.setState({
            mode,
            content: content || ''
        });
    }

    render() {

        return (
            <EditableComment
              onSave={this.onSave}
              onPreview={this.onPreview}
              allowEdits={this.state.mode === 'edit'}
            />
        );
    }
}

const addTextPostCommentMutation = gql`
    mutation addTextPostComment($postId: String!, $authorId: String!, $content: String!) {
        addTextPostComment(postId: $postId, authorId: $authorId, content: $content) {
            id
        }
    }`;

const EditableCommentContainerWithMutation = (graphql(addTextPostCommentMutation) as any)(EditableCommentContainer);

export default EditableCommentContainerWithMutation;