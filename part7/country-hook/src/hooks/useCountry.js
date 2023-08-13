import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const baseUrl = 'https://studies.cs.helsinki.fi';

  useEffect(() => {
    if (name) {
      axios
        .get(`${baseUrl}/restcountries/api/name/${name}`)
        .then((response) => {
          setCountry({ found: true, data: response.data });
        })
        .catch((error) => {
          setCountry({ found: false, data: {} });
        })
        .finally(() => {});
    } else {
      setCountry(null);
    }
  }, [name]);

  return country;
};
