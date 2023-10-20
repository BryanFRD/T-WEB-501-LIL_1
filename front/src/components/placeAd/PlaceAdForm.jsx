import Api from '../../api/Api'
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AsyncSelect from 'react-select/async';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const PlaceAdForm = () => {
  const {user} = useContext(UserContext);
  const [contractTypes, setContractTypes] = useState([]);
  const [AdFormData, setAdFormData] = useState({
    title: '', 
    description: '',
    wages: '', 
    place: '', 
    workingTime: '', 
    contractTypes: [],
  });
  
  const loadContractType = () => {
    return Api.get('/contracttypes')
      .then((response) => {
        const contractTypesData = response.data.models.map((contract) => ({
          value: contract.id, 
          label: contract.name, 
        })); 
        setContractTypes(contractTypesData); 
        return contractTypesData; 
      })
      .catch(() => { 
        return []; 
      });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const contractsIds = {...AdFormData};
    contractsIds.contractTypes = contractsIds.contractTypes.map(option => option.value); 
    contractsIds.companyId = user.id;
    
    try {
      const response = await Api.post(`/ads`, contractsIds);
      if (response.status === 200) {
        toast.success('Annonce déposée avec succès !');
        setAdFormData({
          title: '',
          description: '',
          contractTypes: [],
          wages: '',
          place: '',
          workingTime: '',
        }); 
      }
    } catch(error) {
      toast.error('Erreur lors de la soumission du formulaire'); 
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setAdFormData({
        ...AdFormData, 
        [name]: value,
    }); 
  };
  
  const handleAsyncSelectChange = (selectedOptions) => {
      const selectedValues = selectedOptions.map(option => ({
          value: option.value, 
          label: option.label, 
      }));

      setAdFormData({
          ...AdFormData, 
          contractTypes: selectedValues, 
      }); 
  }; 

  return (
    <div className='w-11/12 shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline flex text-center gap-5 flex-col'>
      <h1 className='text-xl'><strong>Déposer votre annonce</strong></h1>
      <div>
        <form onSubmit={handleSubmit} className='flex gap-6 flex-col'>
          <div className='flex gap-2'>
            <label className='mt-auto mb-auto basis-1/5' htmlFor='title'>Titre de votre annonce:</label>
            <input className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline overflow-auto basis-4/5' type='text' id='title' required name='title' onChange={handleInputChange} value={AdFormData.title} />
          </div>
          <div className='flex gap-2'>
            <label htmlFor='description' className='mt-auto mb-auto basis-1/5'>Description de votre annonce:</label>
            <textarea id='description' rows='5' cols='33' className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline overflow-auto basis-4/5' required name='description' onChange={handleInputChange} value={AdFormData.description}
            ></textarea>
          </div> 
          <div className='flex gap-2'>
            <label
              htmlFor='contractTypes'
              className='mt-auto mb-auto basis-1/5'>
                Type de contrat:
            </label>
            <AsyncSelect cacheOptions loadOptions={loadContractType} defaultOptions isMulti options={contractTypes} className='basis-4/5' required name='contractTypes' onChange={handleAsyncSelectChange} value={AdFormData.contractTypes}/>
          </div>
          <div className='flex gap-2'>
            <label
              htmlFor='wages'
              className='mt-auto mb-auto basis-1/5'>
                Rémunération:
            </label>
            <input id='wages' type='text' className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
            overflow-auto basis-4/5' required name='wages' onChange={handleInputChange} value={AdFormData.wages}/>
          </div>    
          <div className='flex gap-2'>
            <label htmlFor='place'
            className='mt-auto mb-auto basis-1/5'>Lieu:</label>
            <input id='place' type='text'
            className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
            overflow-auto basis-4/5' required name='place' onChange={handleInputChange} value={AdFormData.place}/>
          </div>  
          <div className='flex gap-2'>
            <label htmlFor='workingTime' className='mt-auto mb-auto basis-1/5'>Horaires de travail:</label>
            <input id='workingTime' type='text' className='shadow appearance-none border rounded py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline
            overflow-auto basis-4/5' required name='workingTime' onChange={handleInputChange} value={AdFormData.workingTime}/>
          </div>
          <div>
            <button type='submit' className='bg-black rounded text-white p-2'> Déposer une annonce</button>  
          </div>          
        </form>
      </div>
    </div>
  );
};

PlaceAdForm.propTypes = {
  user: PropTypes.object.isRequired
}

export default PlaceAdForm;  