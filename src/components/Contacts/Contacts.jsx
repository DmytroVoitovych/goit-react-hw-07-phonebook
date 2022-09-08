import PropTypes from 'prop-types';
import { ListCon } from './Contacts.styled';

export const Contacts = ({ contacts, away }) => {
    return (<ListCon>
        {contacts.map((contact, index) => <li key={contact.id}>
            {contact.name}: {contact.number} <button type="button" onClick={()=> away(index) } >delete</button>
        </li>)}
    </ListCon>)
};


Contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    away: PropTypes.func.isRequired
};