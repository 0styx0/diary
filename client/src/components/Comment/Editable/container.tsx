import * as React from 'react';
import  EditableComment from './';
import getJWT from '../../../helpers/getJWT';
import { graphql } from 'react-apollo';
import { TextPostCommentCreation } from '../../../graphql/textPosts/comment';
import { TextPostQuery } from '../../../graphql/textPosts';
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

        const comment = (e.target as HTMLButtonElement).parentElement!.querySelector('[contenteditable]')!;
        const content = comment.textContent;

        this.props.mutate({
            variables: {
                postId: this.props.postId,
                authorId: getJWT().id,
                content
            },
            update: (store) => {

                comment.textContent = '';

                const jwt = getJWT();

                const storage = store.readQuery({query: TextPostQuery}); // if post type is already in the cache
                const newComment = {// there's an error in graphql if try to get this
                    content,
                    authorId: getJWT().id,
                    created: new Date(),
                    id: new Date(),
                    __typename: 'Comment',
                    author: {
                        firstName: jwt.firstName,
                        lastName: jwt.lastName,
                        __typename: 'User'
                    }
                };

                storage.textPosts = storage.textPosts.map(post => {

                    if (post.id === this.props.postId) {
                        post.comments.push(newComment);
                    }
                    return post;
                });

                store.writeQuery({query: TextPostQuery, data: storage });
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

const EditableCommentContainerWithMutation = (graphql(TextPostCommentCreation) as any)(EditableCommentContainer);

export default EditableCommentContainerWithMutation;