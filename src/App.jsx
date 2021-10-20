import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Availability, DashboardChantier, Inscription, Kanban, ListeEmploye, Login, NouveauChantier } from './pages';

import './assets/App.css';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route component={DashboardChantier} path="/chantiers" exact />
            <Route component={Login} path="/connexion" exact />
            <Route component={Inscription} path="/inscription" exact />
            <Route component={Availability} path="/disponibilites" exact />
            <Route component={NouveauChantier} path="/NouveauChantier" exact />
            <Route component={ListeEmploye} path="/ListeDesEmployees" exact />
            <Route component={Kanban} path="/Kanban" exact />
            <Redirect to="/connexion" />
        </Switch>
    </BrowserRouter>
);

export default App;
