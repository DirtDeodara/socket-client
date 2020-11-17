import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Shoutout from './components/Shoutout/Shoutout'

const App = () => (
  <Router>
    <Route path="/" exact component={Join}/>
    <Route path="/chat" component={Chat}/>
    <Route path="/shoutouts" component={Shoutout}/>
  </Router>
);

export default App;
