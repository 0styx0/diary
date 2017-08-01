import * as React from 'react';
import Comment from '../Comment';

interface Props {
    comments: Array<{
        content: string;
        created: Date;
        author: {
            firstName: string;
            lastName: string;
        };
    }>
}

export default function CommentList(props: Props) {

    return (
        <div id="comments">

        {
            props.comments.map((comment, idx) =>
                <Comment
                  author={comment.author.firstName + ' ' + comment.author.lastName}
                  created={comment.created}
                  content={comment.content}
                  key={idx}
                />
            )
        }
        </div>
    );

}