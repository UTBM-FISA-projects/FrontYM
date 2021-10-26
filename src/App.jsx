import React, { useMemo } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

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
    const [user, setUser] = React.useState({ id_user: 0 });

    const connexion = useRouteMatch({ path: '/connexion', exact: true });
    const inscription = useRouteMatch({ path: '/inscription', exact: true });

    const loggedPage = !connexion && !inscription;

    React.useEffect(() => {
        if (loggedPage) {
            request.get('/api/users/current').then(setUser);
        }
    }, [loggedPage]);

    const navbarRender = useMemo(() => (
        <Navbar user={user} />
    ), [user]);

    return (
        <Switch>
            <Route path="/chantiers" exact>
                {navbarRender}
                <DashboardChantier idUser={user.id_user} />
            </Route>
            <Route path="/disponibilites" exact>
                {navbarRender}
                <Availability idUser={user.id_user} />
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
            <Route
                path="/chantiers/:id_yard"
                exact
                render={({ match: { params: { id_yard } } }) => (
                    <>
                        {navbarRender}
                        <Kanban id_yard={Number(id_yard)} />
                    </>
                )}
            />
            <Route component={Login} path="/connexion" exact />
            <Route component={Inscription} path="/inscription" exact />
            <Redirect to="/connexion" />
        </Switch>
    );
};

export default App;
