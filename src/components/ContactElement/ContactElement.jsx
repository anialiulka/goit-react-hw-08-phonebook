import css from './ContactElement.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact as deleteContactInfo } from 'redux/contacts/operations';
import { selectFilteredContacts } from 'redux/contacts/selectors';

export const ContactElement = () => {
  const contacts = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  const deleteContact = id => dispatch(deleteContactInfo(id));
  return contacts.map(contact => (
    <li className={css.listItem} key={contact.id}>
      {contact.name} : {contact.phone}
      <button className={css.button} onClick={() => deleteContact(contact.id)}>
        Delete
      </button>
    </li>
  ));
};
