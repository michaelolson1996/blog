import Admin from './pages/Admin';
import Home from './pages/Home';
import NavBar from './components/admin/NavBar';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/'>
            <Home />
        </Route>
        <Route path='/admin'>
            <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
