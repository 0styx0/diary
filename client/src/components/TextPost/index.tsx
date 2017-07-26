import * as React from 'react';
import * as moment from 'moment';

interface Props {
    title: string;
    content: string;
    created: Date;
}

export default function TextPost(props: Props) {

    const date = moment(new Date(props.created)).fromNow();

    return (
        <details>
          <summary>{props.title} ({date})</summary>
          <article dangerouslySetInnerHTML={{__html: props.content}} />
        </details>
    );
}