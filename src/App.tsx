import React, { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ContactForm from './components/ContactForm';
import { ContactType } from './utils/types';
import { initialContacts } from './utils/samples';
import ContactList from './components/ContactList';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<ContactType[]>(initialContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }; 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddContact = (newContact: ContactType) => {
    const newId = uuidv4();
    setContacts([...contacts, { ...newContact, id: newId }]);
    handleCloseModal();
  };

  const handleDeleteContact = (contactId: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
  };

  const filterContacts = useMemo(() => {
    return contacts.filter((contact: ContactType) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        contact.firstname.toLowerCase().includes(searchLower) ||
        contact.lastname.toLowerCase().includes(searchLower) ||
        contact.phone.includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.address.toLowerCase().includes(searchLower)
      );
    }).sort((a: ContactType, b: ContactType) => a.firstname.localeCompare(b.firstname));
  }, [contacts, searchTerm]);
  


  return (
    <div className="app">
      <ContactForm isOpen={isModalOpen} onClose={handleCloseModal} onAddContact={handleAddContact} />
      <header>
        <h1>Address Book</h1>
        <label htmlFor="search" className="visually-hidden">Search contacts:</label>
        <input
          id="search"
          type="search"
          placeholder="Search contacts"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button aria-label="Create new contact" onClick={handleOpenModal}>Create contact</button>
      </header>
      <main>
      <ContactList contacts={filterContacts} onDeleteContact={handleDeleteContact} />
      </main>
    </div>
  );
};

export default App;
