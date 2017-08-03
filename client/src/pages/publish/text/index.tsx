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

import withSaving from '../withSaving';

import './index.css';

import { TextPostQuery, TextPostCreation } from '../../../graphql/textPosts/';

interface Props {
    addTextPost: Function;
    client: {
        query: Function
    };
    progressSaver: {
        onInput: (e: any) => null
    };
    dbSaver?: any;
}

interface State {
    editor: any;
    title: string;
}

class CreateTextPost extends React.Component<Props, State> {

    componentDidMount() {

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

            editor.on('blur', () => {

                const fakeEvent = { // tinymce doesn't have save event stuff as normal inputs
                    target: {
                        name: 'content',
                        value: editor.getContent()
                    }
                };
                this.props.progressSaver.onInput(fakeEvent);
            });
          }
        });
    }

    componentWillUnmount() {

         (tinymce as any).remove(this.state.editor);
    }

    render() {

        return (
            <form onSubmit={this.props.dbSaver}>
                <input type="text" name="title" {...this.props.progressSaver} />
                <textarea id="editor" />
                <input type="submit" />
            </form>
            );
    }
}


const CreateTextPostWithMutation =
    (graphql(TextPostCreation, {name: 'addTextPost'}) as any)
    (withSaving(CreateTextPost, {
        graphqlSaveMethod: 'addTextPost',
        graphqlQuery: TextPostQuery,
    }));

export default CreateTextPostWithMutation;