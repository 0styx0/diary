import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextPost from '../TextPost';

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

function TextPostList(props: Props) {

    const data = props.data;

    if (data.loading) {
        return null;
    }

    return (
            <div>
                {data.textPosts.map((post: TextPost, i: number) =>
                    <TextPost
                        key={i}
                        title={post.title}
                        content={post.content}
                        created={post.created}
                    />)}
            </div>
            );
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

const TextPostListWithData = (graphql(TextPostQuery) as any)(TextPostList);
export default TextPostListWithData;