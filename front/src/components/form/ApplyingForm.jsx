import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import Api from '../../api/Api';
import PropTypes from 'prop-types';

const ApplyingForm = ({adId, closeModal}) => {
    const {user} = useContext(UserContext); 

    const [formData, setFormData] = useState({
        lastname: '', 
        firstname: '', 
        email : '', 
        phonenumber: '' ,
        adId: adId,
        message: ''
    }); 

    useEffect(() => {
        if (user && user.id) {
            Api.get(`/clients/${user.id}/userdata`)
                .then((response) => {
                    const userData = response.data; 
                    setFormData({
                        lastname: user.lastname,
                        firstname: user.firstname,
                        email: userData.model.email,
                        phonenumber: user.phonenumber,
                        adId: adId,
                        message: ''
                }); 
            })
            .catch(() => {});
        }
    }, [user, adId]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const response = await Api.post('/appliers', formData); 
                console.log(response)
                if (response.status === 201) {
                toast.success('Formulaire envoyé avec succès !');
                setFormData({
                    lastname: '', 
                    firstname : '', 
                    email: '', 
                    phonenumber: '', 
                    adId: adId, 
                    message: ''
                });
                closeModal();
            }
        } catch (error) {
            toast.error('Erreur lors de la soumission du formulaire. ');
        }
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
                <div className='flex flex-col md:flex-row gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                    htmlFor='lastname'>Votre nom:</label>
                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type="text" name='lastname' id='lastname'
                    onChange={handleInputChange}
                    value={formData.lastname}
                     />
                </div>
                <div className='flex flex-col md:flex-row gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                    htmlFor='firstname'>Votre prénom:</label>
                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type="text" name='firstname' id='firstname'
                    onChange={handleInputChange}
                    value={formData.firstname}
                    />
                </div>
                <div className='flex flex-col md:flex-row gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                    htmlFor='email'>Votre email:</label>
                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                    overflow-auto basis-4/5'
                    type="email" name='email' id='email'
                    onChange={handleInputChange} 
                    value={formData.email}
                    />
                </div>
                <div className='flex flex-col md:flex-row gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                    htmlFor='phonenumber'>Téléphone:</label>
                    <input required className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    type='tel' id='phonenumber'
                    name='phonenumber'
                    onChange={handleInputChange}
                    value={formData.phonenumber}
                    />
                </div>
                <div className='flex flex-col md:flex-row gap-2'>
                    <label className='mt-auto mb-auto basis-1/5'
                     htmlFor='messsage'>Message au recruteur : </label>
                    <textarea className='resize-none shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
                        overflow-auto basis-4/5'
                    id='message' value={formData.message} onChange={handleInputChange} name={'message'}></textarea>
                </div>
                <div className='flex justify-center gap-3'>
                    <button type='submit'
                    className='bg-primary hover:bg-primary-darker rounded text-white px-4 py-2 transition-all'>Envoyer votre candidature</button>
            
                </div>
            </form>
        </div>
    );
};

ApplyingForm.propTypes = {
    adId: PropTypes.number,
}

export default ApplyingForm;