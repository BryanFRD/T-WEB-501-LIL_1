import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DisplayCards from '../components/DisplayCards';


const HomeScreen = () => {
  const [search, setSearch] = useState({
    searchJob : '', 
    jobPlace : '', 
  });
  return (
    <div className='pt-4 flex flex-col items-center justify-center'>
      <SearchBar setSearch={setSearch}></SearchBar>
      <DisplayCards search={search}></DisplayCards>
    </div>
  );
};

export default HomeScreen;