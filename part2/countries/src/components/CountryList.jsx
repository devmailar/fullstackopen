const CountryList = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          style={{
            width: '10rem',
          }}
        />
      </div>
    );
  } else if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            <p>{country.name.common}</p>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default CountryList;
