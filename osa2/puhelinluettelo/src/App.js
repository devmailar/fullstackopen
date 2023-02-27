import React, { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const fetchData = async () => {
    const data = await personService.getAll();
    setPersons(data);
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const isDuplicate = persons.find((person) => person.name === newName);

    if (isDuplicate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService.update(2, { name: newName, number: newNumber });
      }
      return;
    }

    try {
      const newPerson = await personService.create({
        name: newName,
        number: newNumber,
      });

      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
    } catch (error) {
      console.error(error);
    }
  };

  const deletePerson = async (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons deletePerson={deletePerson} persons={filterPersons} />
    </div>
  );
};

export default App;
