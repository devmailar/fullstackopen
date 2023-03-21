const Filter = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      filter shown with
      <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;
