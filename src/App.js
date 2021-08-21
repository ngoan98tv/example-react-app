import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">New user</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/create">
            <UserForm />
          </Route>
          <Route path="/update/:id">
            <UserForm />
          </Route>
          <Route path="/detail/:id">
            <UserDetail />
          </Route>
          <Route path="/">
            <UserList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
