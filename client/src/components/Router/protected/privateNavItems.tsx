import * as React from 'react';
import withProtection from './withProtection';
import { Link } from 'react-router-dom';


function PrivateNavItems(props: {admin: boolean}) {

    if (props.admin) {

        return (
            <li>
                <details>
                    <summary>Post</summary>
                    <ul>
                        <li><Link to="/post/text">Text</Link></li>
                        <li><Link to="/post/pictures">Pictures</Link></li>
                        <li><Link to="/post/video">Video</Link></li>
                    </ul>
                </details>
            </li>
        );
    }

    return <span />;
}

export default withProtection(PrivateNavItems as any);