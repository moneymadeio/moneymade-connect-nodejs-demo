import './App.css';
import { Route, Switch } from 'react-router-dom';
import * as pages from './pages';

function App() {
  if (window.location.pathname === '/') {
    window.location = '/login';
  }

  return (<>
    <Switch>
      <Route path='/login' component={pages.Login} />
      <Route path='/loading' component={pages.Loading} />
      <Route path='/dashboard' component={pages.Dashboard} />
      <Route path='/oauth' component={pages.OauthLogin} />
    </Switch>
  </>);
}

export default App;
