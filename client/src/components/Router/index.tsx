import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Index from '../../pages/index';
import CreatePost from '../../pages/create';

export default function Router() {

    return (
        <div>
            <nav>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/post">Post</Link></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/post" component={CreatePost}/>
                <Route path="/" component={Index}/>
            </Switch>
        </div>
        );
}