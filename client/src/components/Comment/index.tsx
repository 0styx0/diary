import * as React from 'react';
import * as moment from 'moment';

import DeleteButton from '../DeleteButton';

interface Props {
    author: string;
    created: Date;
    content: string;
    onDelete: Function;
}

export default function Comment(props: Props) {

    const date = moment(new Date(props.created)).fromNow();

    return (
        <details className="comment">
            <summary>
                <span className="author">{props.author}</span>
                <span className="small">({date})</span>
                <DeleteButton onDelete={props.onDelete}/>
            </summary>
            <div className="content" dangerouslySetInnerHTML={{__html: props.content}} />
        </details>
    );
}