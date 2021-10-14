import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { DashboardChantier, Inscription, Login } from './pages';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route component={Login} path="/login" exact />
            <Route component={Inscription} path="/Inscription" exact />
            <Route component={DashboardChantier} path="/DashboardChantier" exact />
            <Redirect to="/login" />
        </Switch>
    </BrowserRouter>
);

export default App;
