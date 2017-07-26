import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from '../../components/Container';
import TextPost from '../../components/TextPost';

interface TextPost {
    title: string;
    content: string;
    created: Date;
}

interface Props {
    data: {
        loading: boolean,
        error: Object,
        textPosts: [TextPost]
    };
}

class TextPosts extends React.Component<Props, {}> {

    render() {

        if (this.props.data.loading) {
            return null;
        }

        return (
                 <Container
                   heading="Text Posts"
                   children={this.props.data.textPosts.map((post: TextPost, i: number) =>
                                                              <TextPost
                                                                key={i}
                                                                title={post.title}
                                                                content={post.content}
                                                                created={post.created}
                                                              />)}
                 />
                );
    }
}

const TextPostQuery = gql`
    query TextPostQuery {
        textPosts {
            title,
            created,
            content
        }
    }
`;

const IndexWithData = (graphql(TextPostQuery) as any)(TextPosts);

export default IndexWithData;