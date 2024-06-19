import React, { useState } from 'react';
import './ContactForm.css';
import { ContactType } from '../utils/types';
interface NewContactProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (contact: ContactType) => void;
}


const NewContact: React.FC<NewContactProps> = ({ isOpen, onClose, onAddContact }) => {
  const emptyContact: ContactType = { id: '', firstname: '', lastname: '', phone: '', email: '', address: '' };
  const [newContact, setNewContact] = useState(emptyContact);
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValidContact = (
        newContact.firstname.trim() !== '' &&
        /^\d{10}$/.test(newContact.phone) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContact.email)
      );

    if (isValidContact) {
      onAddContact(newContact);
      setNewContact(emptyContact); 
      onClose(); 
      setErrorMessage('');
    } else {
      setErrorMessage('First name, phone and email valid needed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-labelledby="new-contact-title" aria-modal="true">
      <div className="modal">
        <h2 id="new-contact-title" className="visually-hidden">Create a New Contact</h2>
        <button className="close-button" onClick={onClose} aria-label="Close new contact form">X</button>
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <label htmlFor="firstname" className="visually-hidden">First Name</label>
          <input id="firstname" name="firstname" value={newContact.firstname} onChange={handleChange} placeholder="First Name" required />
          
          <label htmlFor="lastname" className="visually-hidden">Last Name</label>
          <input id="lastname" name="lastname" value={newContact.lastname} onChange={handleChange} placeholder="Last Name" required />
          
          <label htmlFor="phone" className="visually-hidden">Phone</label>
          <input id="phone" name="phone" type="tel" pattern="\d{10}" value={newContact.phone} onChange={handleChange} placeholder="Phone" required />
          
          <label htmlFor="email" className="visually-hidden">Email</label>
          <input id="email" name="email" type="email" value={newContact.email} onChange={handleChange} placeholder="Email" required />
          
          <label htmlFor="address" className="visually-hidden">Address</label>
          <input id="address" name="address" value={newContact.address} onChange={handleChange} placeholder="Address" required />
          
          <button type="submit" className={`add-contact-button`}>Add Contact</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default NewContact;
