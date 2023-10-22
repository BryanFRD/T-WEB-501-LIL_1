import { useState } from 'react';
import SearchIcon from './icons/SearchIcon';
import QuestionMarkIcon from './icons/QuestionMarkIcon'; 
import MapIcon from './icons/MapIcon'; 
import PropTypes from 'prop-types';

const SearchBar = ({setSearch}) => {
  const [searchData, setSearchData] = useState({
    searchJob : '', 
    jobPlace : '', 
  });
  
  const handleChange = (e) => {
    setSearchData(oldValue => ({...oldValue, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch({...searchData});
  }
  
  return (
    <form onSubmit={handleSubmit} className='grid grid-flow-cols items-center gap-3
    md:flex md:flex-row'>
      <div className='flex items-center gap-1 shadow appearance-none border rounded w-full text-dark leading-tight focus:outline-none focus:shadow-outline'>
        <div className='px-3 text-primary-darker'>
          <QuestionMarkIcon/>
        </div>
        <input
          id='searchedjob'
          type='text'
          placeholder='Emploi recherché ?'
          className='py-2 px-3'
          value={searchData.searchJob}
          name='searchJob'
          onChange={handleChange}/>
        </div>
        
        <div className='flex items-center gap-1 shadow appearance-none border rounded w-full text-dark leading-tight focus:outline-none focus:shadow-outline' > 
            <div className='px-3 text-primary-darker'>
                <MapIcon/>
            </div>
            <input id='jobplace' type='text' placeholder='Où ?'
            className="py-2 px-3"
            value={searchData?.jobPlace}
            name='jobPlace'
            onChange={handleChange}/>
        </div>
        
        <button type='submit' className='flex items-center gap-1 shadow appearance-none border rounded py-2 px-3 bg-primary hover:bg-primary-darker transition-all'>
            <div className='text-white pe-3'>
                <SearchIcon/>
            </div>
            <p className='md:hidden text-white font-semibold'>Rechercher</p>
        </button>
    </form>
  );
};

SearchBar.propTypes = {
  setSearch: PropTypes.func.isRequired
}

export default SearchBar;