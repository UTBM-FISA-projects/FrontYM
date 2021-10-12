import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Login, Inscription } from './pages';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route component={Login} path="/login" exact />
            <Route component={Inscription} path="/Inscription" exact />
            <Redirect to="/login" />
        </Switch>
    </BrowserRouter>
);

export default App;
