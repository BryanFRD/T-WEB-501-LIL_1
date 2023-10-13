import Api from '../../api/Api'
import React from 'react';
import AsyncSelect from 'react-select/async'
const PlaceAdForm = () => {

    const loadContractType = () => {

        return Api.get('/contracttypes').then((response) => {
            return response.data.models; 

        }).catch((error) => {
            console.log(error); 
            return []; 
        }); 
    }


    return (
        <div className='w-11/12 shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
        flex text-center gap-5 flex-col
        '>
            <h1 className='text-xl'><strong>Déposer votre annonce</strong></h1>
            <div>
                <form className='flex gap-6 flex-col'>
                    <div className='flex gap-2'>
                        <label className='mt-auto mb-auto basis-1/5' 
                        for='title'>Titre de votre annonce :</label>
                        <input className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5' type='text' id='title' required />
                    </div>
                    <div className='flex gap-2'>
                        <label for='description'
                        className='mt-auto mb-auto basis-1/5'>Description de votre annonce :</label>
                        <textarea id='description' rows='5' cols='33'
                        className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5' required></textarea>
                    </div>
                    <div className='flex gap-2'>
                        <label for='contractType'
                        className='mt-auto mb-auto basis-1/5'>Type de contrat :</label>
                        <AsyncSelect cacheOptions loadOptions={loadContractType} defaultOptions
                        isMulti id='contractType'
                        className='basis-4/5' required/>
                    </div>
                    <div className='flex gap-2'>
                        <label for='wages'
                        className='mt-auto mb-auto basis-1/5'>Rémunération :</label>
                        <input id='wages' type='text'
                        className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5' required/>
                    </div>
                    <div className='flex gap-2'>
                        <label for='place'
                        className='mt-auto mb-auto basis-1/5'>Lieu :</label>
                        <input id='place' type='text'
                        className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5' required/>
                    </div>
                    <div className='flex gap-2'>
                        <label for='workingTime'
                        className='mt-auto mb-auto basis-1/5'>Horaires de travail :</label>
                        <input id='workingTime' type='text'
                        className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5' required/>
                    </div>
                    <div>
                        <button type='submit'
                        className='bg-black rounded text-white p-2'><strong>Déposer une annonce</strong></button>
                    </div>
                </form>
            </div>
        </div>
    );
    }; 

export default PlaceAdForm;

   
  