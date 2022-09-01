import React from 'react';
import Table from './components/Table';
import './App.css';
import Filter from './components/Filter';
import StarProvider from './context/ProviderFilter';

function App() {
  return (
    <StarProvider>
      <Filter />
      <Table />
    </StarProvider>

  );
}

export default App;
