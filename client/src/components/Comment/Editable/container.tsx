import * as React from 'react';
import  EditableComment from './';

class EditableCommentContainer extends React.Component<{}, {}> {


    constructor() {
        super();

        this.onSave = this.onSave.bind(this);
    }

    onSave(e) {
        console.log(e.target);
    }

    render() {
        return (
            <EditableComment
              onSave={this.onSave}
            />
        );
    }
}

export default EditableCommentContainer;