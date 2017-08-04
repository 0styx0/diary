import * as React from 'react';
import withProtection from './../../withProtection';
import { Route } from 'react-router-dom';

import PublishText from '../../../pages/publish/text';
import PublishImageAlbum from '../../../pages/publish/album';
import PublishVideo from '../../../pages/publish/video';

function PrivatePaths(props: {admin: boolean}) {

    if (props.admin) {
        return (
            <div>
                <Route path="/post/text" component={PublishText}/>
                <Route path="/post/pictures" component={PublishImageAlbum}/>
                <Route path="/post/video" component={PublishVideo}/>
            </div>
        );
    }
    return <span />;
}

export default withProtection(PrivatePaths as any);