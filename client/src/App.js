import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from "./components/index";
import Login from "./components/login";
import Register from "./components/register";
import Detail from "./components/detail";

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/index">index</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/register">register</Link>
          </li>
        </ul>
        <hr />
        <Route exact path="/index" component={Index} />
        <Route path="/topics" component={Topics} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/detail:id" component={Detail} />
      </div>
    </Router>
  );
};

export default App;
