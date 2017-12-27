import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Categories from './Categories';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import PostDetail from './PostDetail';

// Learning: https://reacttraining.com/react-router/web/api/withRouter

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Categories} />
        <Route exact path='/post' component={PostForm} />
        <Route exact path='/post/:postId' component={PostForm} />
        <Route exact path='/:category' component={Categories} />
        <Route exact path='/:category/:postId' component={PostDetail} />
        <Route exact path='/:category/:postId/comment' component={CommentForm} />
        <Route exact path='/:category/:postId/:commentId' component={CommentForm} />
      </Switch>
    </div>
  );
}

export default App