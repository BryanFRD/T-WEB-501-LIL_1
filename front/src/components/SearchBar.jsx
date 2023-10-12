import React from 'react';
import SearchIcon from './SearchIcon';
import QuestionMarkIcon from './QuestionMarkIcon'

const SearchBar = () => {
    return (
        <div>
            <div>
                <QuestionMarkIcon/>
                <input type='text'></input>
            </div>
        </div>
    );
};

export default SearchBar;