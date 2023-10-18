import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link, Route, Routes, useParams} from 'react-router-dom';
import Modal from '../components/Modal';
import ApplyingForm from '../components/form/ApplyingForm';

const TestData2 = {
    id: 1, 
    title: 'Full Stack Developer', 
    description: 'Le développeur full-stack est un profil très convoité par les entreprises. C’est un architecte des sites web. Il est amené à intervenir sur tous les aspects d’un projet informatique, dès la phase d’architecture logicielle. Il gère toutes les demandes informatiques de ses clients et est capable de concevoir un programme et d’en assurer sa maintenance. Ainsi, il travaille sur le back-office, pour régler la mise en page et les fonctionnalités de linterface administrateur du site. Puis, il développe les nouvelles fonctionnalités côté front-end, et participe au codage et aux tests. Le développeur web full-stack est polyvalent. Il doit être créatif et maîtriser la programmation et les langages informatiques comme Java, PHP, CSS, HTML, etc. Enfin, il doit faire preuve de polyvalence et de rigueur car il est souvent amené à travailler sur des tâches très diverses et de manière autonome. Découvrez le métier de développeur full stack, ses évolutions professionnelles et les formations Studi.', 
    status: 'OPEN',
    contractTypes : 'CDI, CDD, Alternance, BeauGosse, Zizi, Sexe, dfètgfufsbns, fseuygfsvyufse, fsuygcfsg, caca', 
    createdAt : 'Il y a 7 jours', 
    wages: '40.000$/an',
    place: 'Lille',
    workingTime: '40h/semaine',
}; 



const DisplayDetailsScreen = () => {

    const {id} = useParams(); 

    const {user} = useContext(UserContext); 
    const [showModal, setShowModal] = useState(false); 

    const openModal = () =>  {
        setShowModal(true); 
    }; 

    const closeModal = () => {
        setShowModal(false); 
    }

    const [AdDatas, setAdDatas] = useState([])

    const loadAdData = () => {

        return Api.get('/ads')

            .then((response) => {
                const AdData = response.data.models.map((data) => ({
                    id: data.id, 
                    title: data.title,
                    description: data.description, 
                    status: data.status,
                    contractTypes: data.contractTypes, 
                    createdAt: data.createdAt, 
                    wages: data.wages, 
                    place: data.place, 
                    workingTime: data.workingTime,
                })); 
                setAdDatas(AdData);
                
                return AdData; 
                
            })

            
    }

    console.log(AdDatas)

    return (

        

        <div className='shadow appearance-none border rounded text-dark leading-tight focus:outline-none focus:shadow-outline
        w-11/12 flex flex-col ml-auto mr-auto mt-6'>
            
            <div className='ml-auto mr-auto'>
                <h1 className='mt-3 mb-6 text-2xl'><strong>{TestData2.title}</strong></h1>
            </div>
            
            <div className='text-left pl-3 pr-3 indent-4'>
                <p>{TestData2.description}</p>
            </div>
            
            <div className='pt-5 pb-5 flex flex-col gap-y-4'>
                <div className='flex flex-row gap-x-2 pl-3'>
                    <p className='underline font-bold'>Type de contrat : </p>
                    <p>{TestData2.contractTypes}</p>
                </div>
                
                <div className='flex flex-row gap-x-2 pl-3'>
                    <p className='underline font-bold'>Rémunération : </p>
                    <p>{TestData2.wages}</p>
                </div>
                
                <div className='flex flex-row gap-x-2 pl-3'>
                    <p className='underline font-bold'>Lieu : </p>
                    <p>{TestData2.place}</p>
                </div>
                
                <div className='flex flex-row gap-x-2 pl-3'>
                    <p className='underline font-bold'>Temps de travail : </p>
                    <p>{TestData2.workingTime}</p>
                </div>
                
                <div className='flex flex-row gap-x-2 pl-3'>
                    <p className='underline font-bold'>Candidatures : </p>
                    <p>{TestData2.status}</p>
                </div>
            
            </div>
            
            <div className='flex flex-row justify-end pr-3 gap-x-2 pt-5 pb-5'>
                <p className='underline'>Annonce postée :</p>
                <p className='italic'>{TestData2.createdAt}</p>
            </div>

            <div className='flex flex-row gap-5 pb-6 pt-6 ml-auto mr-auto'>

                {!user?.name && <button onClick={openModal} 
                className='border-2 rounded p-3 border-solid border-black
                hover:bg-black hover:text-white'>Candidater</button>}

                    {showModal && (
                        <Modal show={showModal} setShow={closeModal} title="Candidater">
                            <ApplyingForm adId={id} />
                        </Modal>
                    )}

                {user?.name && <button className='rounded p-3 text-white bg-black
                hover:border-black hover:border-solid hover:border-2 hover:bg-white hover:text-black'>Modifier</button>}
            
            </div>
        
        </div>
    
    );

};

export default DisplayDetailsScreen;