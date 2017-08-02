import * as React from 'react';
import * as tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/table';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';

import { graphql, gql, withApollo } from 'react-apollo';

import './index.css';

import { TextPostQuery, TextPostType } from '../../../graphql/textPosts';

interface Props {
    addTextPost: Function;
    client: {
        query: Function
    };
}

interface State {
    editor: any;
    title: string;
}

class CreateTextPost extends React.Component<Props, State> {

    constructor() {

        super();

        this.saveTitleProgress = this.saveTitleProgress.bind(this);
        this.saveToDB = this.saveToDB.bind(this);

        this.state = {
            editor: null,
            title: ''
        };
    }

    /**
     * Preload textposts (used in @see components/TextPostList)
     * Reason: Since updating cache in @see saveToDB, graphql won't
     * bother asking server for posts since it assumes it has them all
     */
    async fetchTextPosts() {

        this.props.client.query({
            query: TextPostQuery
        });
    }

    componentDidMount() {

        this.fetchTextPosts();

        tinymce.init({

          selector: `#editor`,
          skin_url: `/skins/lightgray`,
          plugins: 'wordcount table fullscreen autolink autoresize help image paste code',
          menubar: 'view help edit tools',
          valid_elements: 'abbr[!title],h1,h2,h3,h4,h5,h6,img[!src|alt],p,a[!href],table,td,tr,th,tbody,thead,tfoot' +
                          ',strong,em,u,ul,ol,li,q,blockquote,pre,br',
          content_css: '/tinymce.css',
          setup: (editor) => {

            this.setState({
                editor
            });
          }
        });
    }

    componentWillUnmount() {

         (tinymce as any).remove(this.state.editor);
    }

    saveTitleProgress(e: any) {

        this.setState({
            title: (e.target as HTMLInputElement).value
        });
    }

    saveToDB(e: any) {

        e.preventDefault();
        e.stopPropagation();

        let [title, content] = [this.state.title, this.state.editor.getContent()];

        this.props.addTextPost({
            variables: {
                title,
                content
            },
            // store: apollo's cache, addTextPost: destructured return info from graphql
            update: (store, { data: { addTextPost } }) => {
                this.updateStoreAfterPost(store, addTextPost);
            }
        });
    }

    updateStoreAfterPost(store, textPost: TextPostType) {

        let storage;

        try {
            storage = store.readQuery({query: TextPostQuery});
        } catch (e) {
            storage = {textPosts: []};
        }

        storage.textPosts.push(textPost);

        store.writeQuery({query: TextPostQuery, data: storage });
    }

    render() {

        return (
            <form onSubmit={this.saveToDB}>
                <input type="text" onBlur={this.saveTitleProgress} />
                <textarea id="editor" />
                <input type="submit" />
            </form>
            );
    }
}

const createTextPostMutation = gql`
    mutation createTextPost($title: String!, $content: String!) {
        addTextPost(title: $title, content: $content) {
            title,
            created,
            content,
            id
            comments {
                content,
                created,
                id
                author {
                    firstName,
                    lastName
                }
            }
        }
    }`;

const CreateTextPostWithMutation = (graphql(createTextPostMutation, {name: 'addTextPost'}) as any)(CreateTextPost);

export default withApollo(CreateTextPostWithMutation);