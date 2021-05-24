import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPosts from './pages/CategoryPosts';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/categories">
          <Categories />
        </Route>
        <Route path="/categories/:category">
          <CategoryPosts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
