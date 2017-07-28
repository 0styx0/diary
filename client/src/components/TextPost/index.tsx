import * as React from 'react';
import * as moment from 'moment';

import './index.css';

interface Props {
    title: string;
    content: string;
    created: Date;
    onDelete: Function;
}

export default function TextPost(props: Props) {

    const date = moment(new Date(props.created)).fromNow();

    return (
        <article>
            <details>
                <summary onClick={(e: any) => e.currentTarget.parentNode.parentElement.classList.toggle('activePost')}>
                    {props.title}
                    <span className="small">({date})</span>
                    <button type="button" onClick={(e) => props.onDelete(e)} className="delete">Delete</button>
                </summary>
                <section dangerouslySetInnerHTML={{__html: props.content}} />
            </details>
        </article>
    );
}