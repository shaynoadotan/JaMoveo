import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/results', { state: { query } }); // Pass the search query to results page
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
    </div>
  );
};

export default AdminPage;
