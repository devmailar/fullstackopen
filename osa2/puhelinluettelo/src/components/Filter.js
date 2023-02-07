const Filter = ({ searchTerm, setSearchTerm }) => (
  <div>
    filter shown with{" "}
    <input
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  </div>
);

export default Filter;
