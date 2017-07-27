import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Index from '../../pages/index';
import Publish from '../../pages/publish';
import TextPosts from '../../pages/textPosts';

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
                </ul>
            </nav>
            <Switch>
                <Route path="/entries/text" component={TextPosts}/>
                <Route path="/post/text" component={Publish}/>
                <Route path="/" component={Index}/>
            </Switch>
        </div>
        );
}