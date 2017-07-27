import * as React from 'react';
import * as moment from 'moment';

import './index.css';

interface Props {
    title: string;
    content: string;
    created: Date;
}

export default function TextPost(props: Props) {

    const date = moment(new Date(props.created)).fromNow();

    return (
        <article>
            <details>
                <summary onClick={(e: any) => e.currentTarget.parentNode.parentElement.classList.toggle('activePost')}>
                    {props.title}
                    <span className="small">({date})</span>
                </summary>
                <section dangerouslySetInnerHTML={{__html: props.content}} />
            </details>
        </article>
    );
}