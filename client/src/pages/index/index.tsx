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
                <footer className="socialMedia">
                    {Object.entries(config.social).map((platform, i, platforms) => {
                        if (i < platforms.length - 1) {
                            platform[1] += ", ";
                        }
                        return <span>{platform[0]} - {platform[1]}</span>
                    })}
                </footer>
           </div>
        );
}

export default Index;