import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { DashboardChantier, Availability, Inscription, Login } from './pages';

import './assets/App.css';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route component={DashboardChantier} path="/DashboardChantier" exact />
            <Route component={Login} path="/connexion" exact />
            <Route component={Inscription} path="/inscription" exact />
            <Route component={Availability} path="/disponibilites" exact />
            <Redirect to="/connexion" />
        </Switch>
    </BrowserRouter>
);

export default App;
