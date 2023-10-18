import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import ApplyingForm from './form/ApplyingForm';
import Api from '../api/Api';


const AdCards = ({ ad }) => {
    const {user} = useContext(UserContext); 
    const [showModal, setShowModal] = useState(false); 


    const openModal = () => {
        setShowModal(true); 
    }; 

    const closeModal = () => {
        setShowModal(false); 
    }; 


    return (

        <div className='flex flex-col gap-3 shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline'>
           
           <h1><strong>{ad.title}</strong></h1>
           
           <div>
                <p className='truncate'>{ad.description}</p>
           </div>
           
           <div className='flex justify-center gap-3'>
                <Link to={'ad_details/' + ad?.id} className='bg-black text-white rounded p-1'><strong>Plus</strong></Link>
                {!user?.name && <button onClick={openModal}
                className='border-2 rounded p-1 border-solid border-black'>Candidater</button>}
                    {showModal && (
                <Modal show={showModal} setShow={closeModal} title="Candidater">
                    <ApplyingForm adId={ad.id} />
                </Modal>
    )}
           </div>
        </div>



    ); 

};

export default AdCards;