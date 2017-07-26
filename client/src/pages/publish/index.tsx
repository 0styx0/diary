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

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import './index.css';

interface Props {
    mutate: Function;
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

    componentDidMount() {

        tinymce.init({

          selector: `#editor`,
          skin_url: `${process.env.PUBLIC_URL}/skins/lightgray`,
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


        this.props.mutate({variables: {
            title: this.state.title,
            content: this.state.editor.getContent()
        }});
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
            id
            title
            content
        }
    }`;

const CreateTextPostWithMutation = (graphql(createTextPostMutation) as any)(CreateTextPost);

export default CreateTextPostWithMutation;