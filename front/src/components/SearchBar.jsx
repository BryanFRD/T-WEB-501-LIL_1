import React, { useState } from 'react';
import Api from '../api/Api';
import SearchIcon from './SearchIcon';
import QuestionMarkIcon from './QuestionMarkIcon'; 
import MapIcon from './MapIcon'; 
import PlusIcon from'./PlusIcon'; 


const SearchBar = () => {

    const [searchData, setSearchData] = useState({
        searchedjob : '', 
        jobplace : '', 
    }); 

    return (

        <div className='grid grid-flow-cols items-center gap-3
        md:flex md:flex-row'>

            <div className='flex items-center gap-1 shadow appearance-none border rounded w-full text-dark leading-tight focus:outline-none focus:shadow-outline'>
                <QuestionMarkIcon/>
                <input id='searchedjob' type='text' placeholder='Emploi recherché ?'
                className="py-2 px-3"/>
            </div>
            
            <div className='flex items-center gap-1 shadow appearance-none border rounded w-full text-dark leading-tight focus:outline-none focus:shadow-outline' > 
                <MapIcon/>
                <input id='jobplace' type='text' placeholder='Où ?'
                className="py-2 px-3"/>
            </div>
            
            <div className='flex items-center gap-1 shadow appearance-none border rounded py-2 px-3'>                
                <PlusIcon/>
                <p className='md:hidden'>Plus de critères</p>
            </div>
            
            <div className='flex items-center gap-1 shadow appearance-none border rounded w-auto py-2 px-3'>
                <SearchIcon/>
                <p className='md:hidden'>Rechercher</p>
            </div>
        
        </div>
    );
};

export default SearchBar;