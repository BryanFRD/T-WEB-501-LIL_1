import React, { useState, useEffect } from 'react';
import AdCards from './AdCards';
import Api from '../api/Api';
import { Axios } from 'axios';


const DisplayCards = ({search}) => {
    const [adData, setAdData] = useState([]); 

    useEffect(() => {
        console.log("Test search :", search);
        const loadDatas = () => {
            Api.get('/ads', {params: {search: search.searchJob, place: search.jobPlace}})
                .then((response) => {
                    console.log("Test response : ", response);
                    console.log("Test models :", response.data.models); 
                    setAdData(response.data.models); 
                })
                .catch((error) => {
                    console.error("Erreur lors de la requête :", error); 
                }); 
        }

        loadDatas(); 
    }, [search]); 

    return (
        <div className='flex flex-col pt-6 gap-3 text-center w-5/6
        md:grid md:grid-cols-3 md:w-11/12'>
            {adData.map((data) => (
                <AdCards 
                    ad={data} 
                    key={data.id} />
            ))}

        </div>
    );
};

export default DisplayCards;