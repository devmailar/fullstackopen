import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm.js';
import Persons from './components/Persons.js';
import personService from './personService.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await personService.getAll();
      setPersons(data);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDublicate = persons.find((person) => person.name === newName);

    if (isDublicate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService.update(2, { name: newName, number: newNumber });
      }
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName('');
    setNewNumber('');

    personService.create({
      name: newName,
      number: newNumber,
    });
  };

  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />
    </div>
  );
};

export default App;
