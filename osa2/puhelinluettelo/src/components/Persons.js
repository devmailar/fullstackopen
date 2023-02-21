import personService from '../personService.js';

const Persons = ({ persons }) => {
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id);
    }
  };

  return persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person)}>delete</button>{' '}
    </div>
  ));
};

export default Persons;
