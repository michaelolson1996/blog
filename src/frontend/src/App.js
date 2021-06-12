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
import Post from './pages/Post';
import Footer from './components/Footer';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/categories/:category">
            <CategoryPosts />
          </Route>
          <Route exact path="/categories/:category/:post">
            <Post />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/donate">
            <Donate />
          </Route>
        </Switch>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
