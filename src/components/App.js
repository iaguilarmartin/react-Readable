import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from './Nav';
import PostsList from './PostsList';
import Post from './Post';
import EditPost from './EditPost';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Nav/>
                <div className="container">
                    <Route exact path="/" component={PostsList}/>
                    <Route path="/post" component={Post}/>
                    <Route path="/edit-post" component={EditPost}/>
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
