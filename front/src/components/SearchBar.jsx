import { useState } from 'react';
import SearchIcon from './icons/SearchIcon';
import QuestionMarkIcon from './icons/QuestionMarkIcon'; 
import MapIcon from './icons/MapIcon'; 

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
                <QuestionMarkIcon/>
                <input id='searchedjob' type='text' placeholder='Emploi recherché ?'
                className="py-2 px-3"
                value={searchData.searchJob}
                name='searchJob'
                onChange={handleChange}/>
            </div>
            
            <div className='flex items-center gap-1 shadow appearance-none border rounded w-full text-dark leading-tight focus:outline-none focus:shadow-outline' > 
                <MapIcon/>
                <input id='jobplace' type='text' placeholder='Où ?'
                className="py-2 px-3"
                value={searchData?.jobPlace}
                name='jobPlace'
                onChange={handleChange}/>
            </div>
            
            <button type='submit' className='flex items-center gap-1 shadow appearance-none border rounded w-auto py-2 px-3'>
                <SearchIcon/>
                <p className='md:hidden'>Rechercher</p>
            </button>
        </form>
    );
};

export default SearchBar;