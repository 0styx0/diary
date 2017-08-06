import * as React from 'react';
import './index.css';

import config from '../../config';

interface Props {
    data: {
        loading: boolean,
        error: Object,
        textPosts: Object
    };
}

function Index(props: Props) {

        return (
            <div className="mainPage">
                <div className="bioContainer">
                    <p className="purple">{config.bio}</p>
                </div>
           </div>
        );
}

export default Index;