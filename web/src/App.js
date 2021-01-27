import './App.css';
import { Button, TextField } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import * as pages from './pages';

const style = {
  row: {
    width: '200px',
    marginTop: '5px',
  }
}

function App() {
  return (<>
    <Switch>
      <Route path='/login' component={pages.Login} />
      <Route path='/loading' component={pages.Loading} />
      <Route path='/dashboard' component={pages.Dashboard} />
    </Switch>
  </>);
}

export default App;
