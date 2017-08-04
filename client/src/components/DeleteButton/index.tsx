import * as React from 'react';
import withProtection from '../withProtection';

interface Props {
    onDelete: Function;
    admin?: boolean;
}

function DeleteButton(props: Props) {

    return props.admin ?
      <button type="button" onClick={(e) => e.stopPropagation() || props.onDelete(e)} className="delete">Delete</button>
      : <span />;
}

export default withProtection(DeleteButton as any);