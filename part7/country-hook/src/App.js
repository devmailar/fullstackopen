import React, { useState } from 'react';
import { useCountry } from './hooks/useCountry';
import { useField } from './hooks/useField';

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  const { name, capital, population, flags } = country.data;

  return (
    <div>
      <h3>{name.common}</h3>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <img
        src={flags.png}
        height="100"
        alt={`flag of ${name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
