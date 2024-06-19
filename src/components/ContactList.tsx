import {memo} from 'react'
import { ContactType } from '../utils/types';

interface ContactListProps {
  contacts: ContactType[];
  onDeleteContact: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDeleteContact }) => {
  return (
    <ul aria-labelledby="contact-list-heading">
      <h2 id="contact-list-heading" className="visually-hidden">Contacts List</h2>
      {contacts.map((contact: ContactType) => (
        <li key={contact.id} className="contact-grid" data-testid={`contact-${contact.id}`}>
          <div className="firstname" data-testid="firstname">{contact.firstname}</div>
          <div className="lastname">{contact.lastname}</div>
          <div className="phone">{contact.phone}</div>
          <div className="email">{contact.email}</div>
          <div className="address">{contact.address}</div>
          <button className="delete-button" onClick={() => onDeleteContact(contact.id)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
};

export default memo(ContactList);
