import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Modal from './Modal';
import ApplyingForm from './form/ApplyingForm';
import Api from '../api/Api';
import MapIcons from './icons/MapIcon';
import ContractIcons from './icons/ContractIcon';
import ButtonLink from './ButtonLink';
import PropTypes from 'prop-types';

const AdCards = ({ ad }) => {
  const {user} = useContext(UserContext); 
  const [showModal, setShowModal] = useState(false); 
  const [contractTypes, setContractTypes] = useState('');
  
  useEffect(() => {
    Api.get(`/ads/${ad.id}/contracttypes`)
      .then(({data}) => setContractTypes(data.models.reduce((acc, {name}) => `${acc} ${name}`, '')))
      .catch(() => setContractTypes(''));
  }, [ad]);
  
  const openModal = () => {
    setShowModal(true); 
  };
  
  const closeModal = () => {
    setShowModal(false); 
  };
  
  return (
    <div className='flex flex-col gap-3 shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline'>
      <h1  className='font-semibold text-lg mx-auto'>{ad.title}</h1>
      <div className='text-start mx-3 truncate'>
        <span>{ad.description}</span>
      </div>
      {ad?.place && 
        <div className='flex gap-1 items-center text-slate-500'>
          <MapIcons />
          <span>{ad.place}</span>
        </div>  
      }
      {(contractTypes && contractTypes !== '') &&
        <div className='flex gap-1 items-center text-slate-500'>
          <ContractIcons />
          <span>{contractTypes}</span>
        </div>
      }
      <div className='flex flex-col sm:flex-row justify-center gap-3'>
        <ButtonLink 
          to={'/ad_details/' + ad?.id}
          className='bg-primary text-white rounded hover:bg-primary-darker'>
            Plus
        </ButtonLink>
        {!user?.name && 
          <ButtonLink 
            onClick={openModal}
            className='border-2 rounded border-primary hover:border-primary-darker text-primary font-semibold hover:bg-primary-darker hover:text-white'>
              Candidater
          </ButtonLink>
        }
        {showModal &&
          <Modal
            show={showModal}
            setShow={closeModal}
            title="Candidater">
              <ApplyingForm adId={ad.id} closeModal={closeModal} />
          </Modal>
        }
        </div>
      </div>
    );
};

AdCards.propTypes = {
  ad: PropTypes.object.isRequired
}

export default AdCards;