import React from 'react';
import SearchBar from '../components/SearchBar';
import DisplayCards from '../components/DisplayCards';


const HomeScreen = () => {
  return (
    <div className='pt-4 flex flex-col items-center justify-center'>
      <SearchBar></SearchBar>
      <DisplayCards></DisplayCards>
    </div>
  );
};

export default HomeScreen;