import * as React from 'react';
import * as moment from 'moment';
import CommentList from '../CommentList';
import './index.css';
import DeleteButton from '../DeleteButton';

interface Props {
    title: string;
    content: string;
    created: Date;
    onDelete: Function;
    comments?: Array<{
        content: string;
        created: Date;
        author: {
            firstName: string;
            lastName: string;
        }
    }>;
}

export default function TextPost(props: Props) {

    const date = moment(new Date(props.created)).fromNow();

    return (
        <article>
            <details>
                <summary onClick={(e: any) => e.currentTarget.parentNode.parentElement.classList.toggle('activePost')}>
                    {props.title}
                    <span className="small">({date})</span>
                    <button type="button" onClick={(e) => e.stopPropagation() || props.onDelete(e)} className="delete">Delete</button>
                </summary>
                <section dangerouslySetInnerHTML={{__html: props.content}} />

                {
                    props.comments ?
                      <CommentList
                        comments={props.comments}
                      />
                    : ''
                }
            </details>
        </article>
    );
}