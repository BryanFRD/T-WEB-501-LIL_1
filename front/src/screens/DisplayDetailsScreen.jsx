import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useParams} from 'react-router-dom';
import Modal from '../components/Modal';
import ApplyingForm from '../components/form/ApplyingForm';
import Api from '../api/Api';
import AdAppliersCard from '../components/placeAd/AdAppliersCard';
import moment from 'moment';
import ButtonLink from '../components/ButtonLink';

const DisplayDetailsScreen = () => {
    const {id} = useParams(); 
    const {user} = useContext(UserContext); 
    const [showModal, setShowModal] = useState(false); 
    const [adData, setAdData] = useState({}); 
    const [adDataContractType, setAdDataContractType] = useState([]); 
    const [appliers, setAppliers] = useState([]);
    
    useEffect(() => {
        Api.get(`/ads/${id}`)
            .then((response) => {
                setAdData(response.data.model)
            }) 
            .catch(() => {
                setAdData({});
            }); 
        Api.get(`/ads/${id}/contracttypes`)
            .then((response) => {
                const contractTypes = response.data.models.map((contractType) => contractType.name)
                setAdDataContractType(contractTypes); 
            })
            .catch(() => {
                setAdDataContractType([]);
            }); 
        Api.get(`/ads/${id}/appliers`)
            .then(({data}) => {
                setAppliers(data.models)
            })
            .catch(() => setAppliers([]));
    }, [id]); 
    
    const openModal = () =>  {
        setShowModal(true); 
    }; 

    const closeModal = () => {
        setShowModal(false); 
    }
    
    return (
        <div className='flex flex-col gap-8'>
            <div className='shadow appearance-none border rounded text-dark leading-tight focus:outline-none focus:shadow-outline
            w-11/12 flex flex-col ml-auto mr-auto mt-6'>
                <div className='ml-auto mr-auto'>
                    <h1 className='mt-3 mb-6 text-xl sm:text-2xl'><strong>{adData?.title}</strong></h1>
                </div>
                <hr className='w-2/3 lg:w-1/5 mx-auto border-t-2 rounded border-primary'/>
                <div className='text-left pl-3 pr-3 indent-4 my-4'>
                    <p>{adData?.description}</p>
                </div>
                <div className='pt-5 pb-5 flex flex-col gap-y-4'>
                    <div className='flex flex-col md:flex-row gap-x-2 pl-3'>
                        <p className='underline font-bold'>Type de contrat: </p>
                        <p>{adDataContractType.join(', ')}</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-x-2 pl-3'>
                        <p className='underline font-bold'>Rémunération: </p>
                        <p>{adData?.wages}</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-x-2 pl-3'>
                        <p className='underline font-bold'>Lieu: </p>
                        <p>{adData?.place}</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-x-2 pl-3'>
                        <p className='underline font-bold'>Temps de travail: </p>
                        <p>{adData?.workingTime}</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-x-2 pl-3'>
                        <p className='underline font-bold'>Candidatures: </p>
                        <p>{adData?.status}</p>
                    </div>
                
                </div>
                <div className='flex flex-col md:flex-row justify-end pr-3 gap-x-2 pt-5 pb-5'>
                    <p className='underline'>Annonce postée le:</p>
                    <p className='italic'>{moment(adData?.createdAt).format('DD/MM/YYYY')}</p>
                </div>
                <div className='flex flex-row gap-5 pb-6 pt-6 ml-auto mr-auto'>

                    {!user?.name && <ButtonLink onClick={openModal} 
                    className='border-2 rounded p-3 border-solid text-primary border-primary
                    hover:bg-primary hover:text-slate-50'>Candidater</ButtonLink>}

                        {showModal && (
                            <Modal show={showModal} setShow={closeModal} title="Candidater">
                                <ApplyingForm adId={id} />
                            </Modal>
                        )}

                    {user?.name && <ButtonLink className='rounded text-white bg-primary
                    hover:border-primary hover:border-solid border-2 hover:bg-slate-50 hover:text-primary'>Modifier</ButtonLink>}
                
                </div>
            </div>
            {(user?.isCompany || user?.isAdmin) &&
            <>
                <h2 className='text-center text-xl font-semibold'>Candidatures:</h2>
                <div className='flex justify-center items-center mb-8'>
                    {appliers.map((applier) => <AdAppliersCard key={applier} applier={applier}/>)}
                </div>
            </>
            }
        </div>
    
    );

};

export default DisplayDetailsScreen;