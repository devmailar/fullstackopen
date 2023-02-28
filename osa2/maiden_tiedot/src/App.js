import axios from 'axios';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import CountryList from './components/CountryList';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <CountryList filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
