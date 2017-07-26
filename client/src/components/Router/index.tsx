import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Index from '../../pages/index';
import Publish from '../../pages/publish';
import TextPosts from '../../pages/textPosts';

export default function Router() {

    return (
        <div>
            <nav>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/post">Post</Link></li>
                    <li><Link to="/posts/text">Text Posts</Link></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/posts/text" component={TextPosts}/>
                <Route path="/post" component={Publish}/>
                <Route path="/" component={Index}/>
            </Switch>
        </div>
        );
}