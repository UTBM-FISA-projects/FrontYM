import { Building, Person, PersonFill } from 'react-bootstrap-icons';

const userType = {
    names: {
        'enterprise': 'Entreprise',
        'supervisor': 'Conducteur de travaux',
        'project_owner': 'Maitre d\'ouvrage',
    },

    icons: {
        'enterprise': Building,
        'supervisor': PersonFill,
        'project_owner': Person,
    }
}

export default userType;
