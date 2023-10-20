import { useState, useEffect } from 'react';
import AdCards from './AdCards';
import Api from '../api/Api';
import PropTypes from 'prop-types';

const DisplayCards = ({search}) => {
  const [adData, setAdData] = useState([]); 

  useEffect(() => {
    const loadDatas = () => {
      Api.get('/ads', {params: {search: search.searchJob, place: search.jobPlace}})
        .then((response) => { 
          setAdData(response.data.models); 
        })
        .catch(() => setAdData([])); 
    }
    loadDatas(); 
  }, [search]); 

  return (
    <div className='flex flex-col pt-6 gap-3 text-center w-5/6
    md:grid md:grid-cols-3 md:w-11/12'>
      {adData.map((data) => (
        <AdCards 
          ad={data} 
          key={data.id}/>
      ))}
    </div>
  );
};

DisplayCards.propTypes = {
  search: PropTypes.object.isRequired
}

export default DisplayCards;