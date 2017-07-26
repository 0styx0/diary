import * as React from 'react';

interface Props {
    content: string
}

export default function TextPost(props: Props) {

    return <article dangerouslySetInnerHTML={{__html: props.content}} />
}