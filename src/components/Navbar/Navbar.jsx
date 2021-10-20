import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Nav, Navbar as BsNavbar } from 'react-bootstrap';
import { PersonSquare } from 'react-bootstrap-icons';

import NotificationPopover from './NotificationPopover';

import { theme } from '../../utils';

import logo from '../../assets/logo_light.png';

const Navbar = ({ user }) => (
    <BsNavbar sticky="top" className="mb-3" bg="dark" variant="dark" expand="md">
        <BsNavbar.Brand as={Link} to="/chantiers">
            <img src={logo} height={30} alt="Logo Yard Management" />
        </BsNavbar.Brand>
        <BsNavbar.Toggle />
        <BsNavbar.Collapse>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/profil">Profil</Nav.Link>
                <Nav.Link as={Link} to="/employes">Employés</Nav.Link>
                <Nav.Link as={Link} to="/disponibilites">Disponibilités</Nav.Link>
            </Nav>
            <Nav>
                <NotificationPopover />
                <Nav.Link as={Link} to="/profil">{user.name}</Nav.Link>
                <Nav.Link as="div"><PersonSquare color={theme.secondaryDark} size={30} /></Nav.Link>
            </Nav>
        </BsNavbar.Collapse>
    </BsNavbar>
);

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
};

export default Navbar;
