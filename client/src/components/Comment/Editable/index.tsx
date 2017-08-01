import * as React from 'react';
import './index.css';

interface Props {
    onSave: any; // should be onClick event handler but typescript blows up
    onPreview: any; // ditto
    allowEdits: boolean;
}

export default function EditableComment(props: Props) {

    return (
        <article className="editable comment">
            <div contentEditable={props.allowEdits && !!sessionStorage.getItem('jwt')} className="content" />
            <button onClick={props.onSave}>Post</button>
            <button onClick={props.onPreview}>Preview</button>
        </article>
    );
}