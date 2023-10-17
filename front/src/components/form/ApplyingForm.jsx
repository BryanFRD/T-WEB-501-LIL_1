import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Api from '../../api/Api';

const ApplyingForm = ({adId}) => {

    const {user} = useContext(UserContext); 

    console.log(user)

    const [formData, setFormData] = useState({
        lastname: '', 
        firstname: '', 
        email : '', 
        phonenumber: '' ,
        adId: adId, 
    }); 

    useEffect(() => {
        if (user) {
            setFormData({
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                phonenumber: user.phonenumber,
                adId: adId,  
            }); 
        }
    }, [user, adId]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
            
            try {
                const response = await Api.post('/appliers', formData); 
                if (response.status === 200) {
                toast.success('Formulaire envoyé avec succès !'); 
                console.log('Formulaire envoyé avec succès.'); 
                setFormData({
                    lastname: '', 
                    firstname : '', 
                    email: '', 
                    phonenumber: '', 
                    adId: adId, 
                });  
            }
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire', error); 
        toast.error('Erreur lors de la soumission du formulaire. '); 
    }; 
    }; 

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setFormData({
            ...formData, 
            [name] : value
        }); 
    }; 

    return (

        <div>

            <form onSubmit={handleSubmit} className='flex gap-6 flex-col'>

                <div className='flex gap-2'>

                    <label className='mt-auto mb-auto basis-1/5'
                    htmlFor='lastname'>Votre nom :</label>

                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type="text" name='lastname' id='lastname'
                    onChange={handleInputChange}
                    value={formData.lastname}
                     />

                </div>

                <div className='flex gap-2'>

                    <label className='mt-auto mb-auto basis-1/5'
                    htmlFor='firstname'>Votre prénom :</label>

                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type="text" name='firstname' id='firstname'
                    onChange={handleInputChange}
                    value={formData.firstname}
                    />

                </div>

                <div className='flex gap-2'>

                    <label className='mt-auto mb-auto basis-1/5'
                    htmlFor='email'>Votre email :</label>

                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                    overflow-auto basis-4/5'
                    type="email" name='email' id='email'
                    onChange={handleInputChange} 
                    value={formData.email}
                    />

                </div>

                <div className='flex gap-2'>

                    <label className='mt-auto mb-auto basis-1/5'
                    htmlFor='phonenumber'>Votre numéro de téléphone : </label>

                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type='tel' id='phonenumber'
                    onChange={handleInputChange}
                    value={formData.phonenumber}
                    />

                </div>

                <div className='flex justify-center gap-3'>

                    <button type='submit'
                    className='bg-black rounded text-white p-2'>Envoyer votre candidature</button>
                
                </div>
            </form>
        </div>
    );


}; 

export default ApplyingForm;