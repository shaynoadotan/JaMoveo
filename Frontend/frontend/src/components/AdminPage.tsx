import React, { useState } from 'react';

const AdminPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
  };

  return (
    <div>
      <h2>Search any song...</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter song name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {searchPerformed && <p>Moving to Results Page...</p>}
    </div>
  );
};

export default AdminPage;
