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
      <Route path='/oauth-iframe' component={pages.OauthIframe} />
      <Route path='/oauth-popup' component={pages.OauthPopup} />
      <Route path='/error' component={pages.Error} />
    </Switch>
  </>);
}

export default App;
