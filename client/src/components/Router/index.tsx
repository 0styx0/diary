import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Index from '../../pages/index';
import PublishText from '../../pages/publish/text';
import PublishImageAlbum from '../../pages/publish/album';
import TextPosts from '../../pages/textPosts';
import ImageAlbumPosts from '../../pages/imagePosts';

import './index.css';

export default function Router() {

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>
                      <details>
                        <summary>Post</summary>
                        <ul>
                          <li><Link to="/post/text">Text</Link></li>
                          <li><Link to="/post/video">Video</Link></li>
                          <li><Link to="/post/pictures">Pictures</Link></li>
                        </ul>
                      </details>
                    </li>
                    <li><Link to="/entries/text">Text Posts</Link></li>
                    <li><Link to="/entries/imageAlbums">Pictures</Link></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/entries/text" component={TextPosts}/>
                <Route path="/entries/imageAlbums" component={ImageAlbumPosts}/>
                <Route path="/post/text" component={PublishText}/>
                <Route path="/post/pictures" component={PublishImageAlbum}/>
                <Route path="/" component={Index}/>
            </Switch>
        </div>
        );
}