import React, { useMemo } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import {
    Availability,
    DashboardChantier,
    Inscription,
    Kanban,
    ListeEmploye,
    Login,
    NouveauChantier,
    Profil,
} from './pages';

import { Navbar } from './components';

import { request } from './utils';
import './assets/App.css';

const App = () => {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        request.get('/api/users/current').then(setUser);
    }, []);

    const navbarRender = useMemo(() => (
        <Navbar user={user} />
    ), [user]);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/chantiers" exact>
                    {navbarRender}
                    <DashboardChantier />
                </Route>
                <Route path="/disponibilites" exact>
                    {navbarRender}
                    <Availability />
                </Route>
                <Route path="/chantiers/nouveau" exact>
                    {navbarRender}
                    <NouveauChantier />
                </Route>
                <Route path="/profil" exact>
                    {navbarRender}
                    <Profil user={user} />
                </Route>
                <Route path="/employes" exact>
                    {navbarRender}
                    <ListeEmploye />
                </Route>
                <Route path="/chantiers/:id_chantier">
                    {navbarRender}
                    <Kanban />
                </Route>
                <Route component={Login} path="/connexion" exact />
                <Route component={Inscription} path="/inscription" exact />
                <Redirect to="/connexion" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
