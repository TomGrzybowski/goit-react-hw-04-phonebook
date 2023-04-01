import { useEffect, useState } from 'react';
import { nanoid } from '../../../node_modules/nanoid/index.js';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
import Filter from './Filter.jsx';
import PropTypes from 'prop-types';

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(localStorage.getItem('contacts')));
    } else {
      localStorage.setItem('contacts', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  });

  const addContact = event => {
    event.preventDefault();

    // @ts-ignore
    const nameInput = document.querySelector('#name').value;

    // @ts-ignore
    const numberInput = document.querySelector('#number').value;

    const nameExists = contacts.some(contact => contact.name === nameInput);

    if (nameExists) {
      alert(`${nameInput} is already present in the phonebook`);
      return;
    }
    const newContact = {
      id: `id-${nanoid()}`,
      name: nameInput,
      number: numberInput,
    };

    setContacts([...contacts, newContact]);
  };

  const deleteContact = event => {
    event.preventDefault();

    const targetName = event.target.name;
    const newContacts = [...contacts];

    const targetIndex = newContacts.findIndex(
      element => element.name === targetName
    );

    newContacts.splice(targetIndex, 1);

    setContacts(newContacts);
  };

  const handleFilterUpdate = event => {
    event.preventDefault();
    // @ts-ignore
    const newFilterValue = document.querySelector('#filter-input').value;
    console.log(newFilterValue);
    setFilter(newFilterValue);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter handleFilterUpdate={handleFilterUpdate} />
      <ContactList
        contacts={contacts}
        deleteContact={deleteContact}
        filter={filter}
      />
    </>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};

export default Phonebook;
