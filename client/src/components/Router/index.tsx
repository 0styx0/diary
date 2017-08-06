import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Index from '../../pages/index';
import TextPosts from '../../pages/textPosts';
import ImageAlbumPosts from '../../pages/imagePosts';
import VideoPosts from '../../pages/videoPosts';
import Login from '../../pages/login';

import PrivateNavItems from './protected/privateNavItems';
import PrivatePaths from './protected/privatePaths';

import './index.css';

export default function Router() {

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <PrivateNavItems />
                    <li><Link to="/entries/text">Text Posts</Link></li>
                    <li><Link to="/entries/imageAlbums">Pictures</Link></li>
                    <li><Link to="/entries/video">Videos</Link></li>
                    <li><Login /></li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route path="/entries/text" component={TextPosts}/>
                <Route path="/entries/imageAlbums" component={ImageAlbumPosts}/>
                <Route path="/entries/video" component={VideoPosts}/>
                <PrivatePaths />
            </Switch>
        </div>
        );
}