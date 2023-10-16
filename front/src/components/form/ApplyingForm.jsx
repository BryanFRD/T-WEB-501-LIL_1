import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Api from '../../api/Api';

const ApplyingForm = () => {

    const [formData, setFormData] = useState({
        name: '', 
        firstName: '', 
        email : '', 
        phoneNumber: '' ,
    }); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
            
            try {
                const response = await Api.post('/appliers'); 
                if (response.status === 200) {
                toast.success('Formulaire envoyé avec succès !'); 
                console.log('Formulaire envoyé avec succès.'); 
                setFormData({
                    name: '', 
                    firstName : '', 
                    email: '', 
                    phoneNumber: '', 
                });  
            }
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire', error); 
        toast.error('Erreur lors de la soumission du formulaire. '); 
    }; 

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setFormData({
            ...formData, 
            [name] : value
        }); 
    }; 

    }; 

    return (

        <div>
            <form onSubmit={handleSubmit} className='flex gap-6 flex-col'>
                <div className='flex gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                    for='name'>Votre nom :</label>
                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type="text" name='name' id='name' />
                </div>
                <div className='flex gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                    for='firstName'>Votre prénom :</label>
                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type="text" name='firstname' id='firstname'/>
                </div>
                <div className='flex gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                    for='email'>Votre email :</label>
                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type="email" name='email' id='email' />
                </div>
                <div className='flex gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                    for='phoneNumber'>Votre numéro de téléphone : </label>
                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type='tel' id='phoneNumber'></input>
                </div>
                <div>
                    <button type='submit'
                    className='bg-black rounded text-white p-2'>Envoyer votre candidature</button>
                </div>
            </form>
        </div>
    );


}; 

export default ApplyingForm;