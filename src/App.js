import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';
import { configure } from 'axios-hooks'
import LRU from 'lru-cache'
import Axios from 'axios'
import UserListPage from './components/UserListPage';

const axios = Axios.create({
  baseURL: 'https://61176b1030022f0017a05df6.mockapi.io/api/v1/',
})
const cache = new LRU({ max: 10 })

configure({ axios, cache })

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
            <UserListPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
