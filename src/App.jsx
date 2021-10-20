import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Availability, DashboardChantier, Inscription, Login, NouveauChantier } from './pages';

import './assets/App.css';
import { Profil } from './pages/Profil';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route component={DashboardChantier} path="/chantiers" exact />
            <Route component={Login} path="/connexion" exact />
            <Route component={Inscription} path="/inscription" exact />
            <Route component={Availability} path="/disponibilites" exact />
            <Route component={NouveauChantier} path="/nouveau/chantier" exact />
            <Route component={Profil} path="/profil" exact />
            <Redirect to="/connexion" />
        </Switch>
    </BrowserRouter>
);

export default App;
