import * as React from 'react';
import CommentContainer from '../Comment/container';
import EditableCommentContainer from '../Comment/Editable/container';

interface Props {
    postId: string;
    comments: Array<{
        content: string;
        created: Date;
        id: string;
        author: {
            firstName: string;
            lastName: string;
        };
    }>
}

export default function CommentList(props: Props) {


    if (!props.comments) {
        return <span />;
    }

    return (
        <div id="comments">

        {
            props.comments.map((comment, idx) =>
                <CommentContainer
                  author={comment.author.firstName + ' ' + comment.author.lastName}
                  created={comment.created}
                  content={comment.content}
                  postId={props.postId}
                  id={comment.id}
                  key={comment.id}
                />
            )
        }
        {sessionStorage.getItem('jwt') ? <EditableCommentContainer postId={props.postId} /> : ''}
        </div>
    );

}