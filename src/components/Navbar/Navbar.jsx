import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

import { Nav, Navbar as BsNavbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';

import NotificationPopover from './NotificationPopover';

import { request, theme, userType } from '../../utils';

import logo from '../../assets/logo_light.png';

const Navbar = ({ user }) => {
    const { name, type } = user;

    const profil = useRouteMatch('/profil');
    const chantiers = useRouteMatch({ path: '/chantiers', exact: true });
    const employes = useRouteMatch('/employes');
    const dispos = useRouteMatch('/disponibilites');

    const handleLogout = React.useCallback(() => {
        request.get('/api/logout').then(() => {window.location = '/connexion';});
    }, []);

    return (
        <BsNavbar sticky="top" className="mb-3" bg="dark" variant="dark" expand="md">
            <BsNavbar.Brand as={Link} to="/chantiers">
                <img src={logo} height={30} alt="Logo Yard Management" />
            </BsNavbar.Brand>
            <BsNavbar.Toggle />
            <BsNavbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Link as={Link} active={chantiers} to="/chantiers">Chantiers</Nav.Link>
                    {type === 'enterprise' && (
                        <>
                            <Nav.Link as={Link} active={employes} to="/employes">Employés</Nav.Link>
                            <Nav.Link as={Link} active={dispos} to="/disponibilites">Disponibilités</Nav.Link>
                        </>
                    )}
                </Nav>
                <Nav>
                    <NotificationPopover />
                    <Nav.Link as={Link} active={profil} to="/profil">{name}</Nav.Link>
                    <Nav.Link as="div">
                        {type && React.createElement(userType.icons[type], { size: 30, color: theme.secondaryDark })}
                    </Nav.Link>
                    <OverlayTrigger
                        trigger="hover"
                        overlay={<Tooltip>Se déconnecter</Tooltip>}
                        placement="bottom"
                    >
                        <Nav.Link onClick={handleLogout}>
                            <BoxArrowRight color={theme.secondaryDark} size={30} />
                        </Nav.Link>
                    </OverlayTrigger>
                </Nav>
            </BsNavbar.Collapse>
        </BsNavbar>
    );
};

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Navbar;
