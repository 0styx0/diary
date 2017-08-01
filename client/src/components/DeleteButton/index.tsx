import * as React from 'react';
import getJWT from '../../helpers/getJWT';

interface Props {
    onDelete: Function;
}

export default function DeleteButton(props: Props) {

    return getJWT().admin ?
      <button type="button" onClick={(e) => e.stopPropagation() || props.onDelete(e)} className="delete">Delete</button>
      : <span />;
}