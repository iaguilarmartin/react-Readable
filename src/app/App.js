import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from './Nav';
import PostsList from '../posts/PostsList';
import Post from '../currentPost/Post';
import EditPost from '../currentPost/EditPost';

const App = function () {
    return (
        <BrowserRouter>
            <div>
                <Nav/>
                <div className="container">
                    <Route exact path="/" component={PostsList}/>
                    <Route excat path="/new-post" component={EditPost}/>
                    <Route exact path="/:category/:post" component={Post}/>
                    <Route exact path="/:category/:post/edit" component={EditPost}/>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
