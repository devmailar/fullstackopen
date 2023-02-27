import React, { useEffect, useState, useRef } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  const fetchData = async () => {
    const data = await personService.getAll();
    setPersons(data);
  };

  const addPerson = async (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmed) {
        try {
          const updatePerson = await personService.update(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          });

          setPersons(
            persons.map((person) =>
              person.id === updatePerson.id ? updatePerson : person
            )
          );

          setMessage({
            type: 'success',
            message: `${newName} number updated`,
          });
          clearTimeout(timerRef.current);

          timerRef.current = setTimeout(() => {
            setMessage(null);
          }, 4000);

          setNewName('');
          setNewNumber('');
        } catch (error) {
          console.error(error);

          setMessage({
            type: 'error',
            message: error,
          });

          clearTimeout(timerRef.current);

          timerRef.current = setTimeout(() => {
            setMessage(null);
          }, 4000);
        }
      }
      return;
    }

    try {
      const newPerson = await personService.create({
        name: newName,
        number: newNumber,
      });

      setMessage({
        type: 'success',
        message: `Added ${newName}`,
      });
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setMessage(null);
      }, 4000);

      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
    } catch (error) {
      console.error(error);

      setMessage({
        type: 'error',
        message: error,
      });

      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setMessage(null);
      }, 4000);
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
      <Notification message={message} />
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
