import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Login } from './pages';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route component={Login} path="/login" exact />
            <Redirect to="/login" />
        </Switch>
    </BrowserRouter>
);

export default App;
