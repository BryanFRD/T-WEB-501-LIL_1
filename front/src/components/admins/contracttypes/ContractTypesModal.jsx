import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AsyncSelect from 'react-select/async';
import Api from '../../../api/Api';
import Modal from '../../Modal';

const ContractTypesModal = ({modalData, show, setShow, setDataList}) => {
  const [data, setData] = useState({
    name: '',
    deletedAt: false
  });
  
  const handleChange = (e) => {
    setData(oldValue => ({...oldValue, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataEntries = Object.fromEntries(formData);
    dataEntries.deletedAt = dataEntries.deletedAt ? new Date() : null;
    dataEntries.status = dataEntries.status ? 'OPEN' : 'CLOSED';
    dataEntries.companyId = dataEntries.company !== '' ? dataEntries.company : null;
    
    if(modalData?.method === 'CREATE'){
      Api.post('/contracttypes', dataEntries)
        .then(({data}) => {
          dataEntries.id = data.model.id;
          if(data.success){
            setDataList(oldValue => [...oldValue, dataEntries]);
            
            if(dataEntries.deletedAt){
              Api.delete(`/contracttypes/${data.model.id}`)
                .then(() => {})
                .catch(() => {});
            }
            
            setShow(false);
            toast.success('Annonce mise à jour avec succès !');
            return;
          }
          toast.error('Erreur lors de la mise à jour de l\'annonce !');
        })
        .catch(() => {
          toast.error('Erreur lors de la mise à jour de l\'annonce !');
        });
        
      return;
    }
    
    if(modalData.data?.deletedAt !== data?.deletedAt){
      Api.delete(`/contracttypes/${modalData.data.id}${modalData.data.deletedAt ? '/restore' : ''}`)
      .then(() => modalData.updateData({...modalData.data, deletedAt: !modalData.data.deletedAt ? new Date() : null}))
      .catch(() => {});
    }
    
    Api.put(`/contracttypes/${modalData.data.id}`, dataEntries, {params: {deleted: true}})
      .then(({data}) => {
        if(data.success){
          if(modalData?.updateData){
            modalData.updateData(data.model);
          }
          
          setShow(false)
          toast.success('Type de contrat mis à jour avec succès !');
          return;
        }
        toast.error('Erreur lors de la mise à jour du type de contrat !');
      })
      .catch(() => {
        toast.error('Erreur lors de la mise à jour du type de contrat !');
      });
  }
  
  useEffect(() => {
    setData(() => {
      if(modalData?.method === 'CREATE'){
        return {
          name: ''
        };
      }
      
      modalData.data.deletedAt = Boolean(modalData.data.deletedAt);
      return modalData.data;
    });
    
  }, [modalData]);
  
  return (
    <Modal show={show} title={'Type de contrat'} setShow={setShow}>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label>Titre:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.name} placeholder='Nom' name='name' onChange={handleChange}/>
        </div>
        <div className='flex items-center gap-2'>
          <label>Supprimé:</label>
          <input type="checkbox" checked={data.deletedAt} name='deletedAt' onChange={handleChange}/>
        </div>
        <div className='ms-auto'>
          <button type='submit' className='py-2 px-4 bg-green-600 rounded text-white whitespace-nowrap'>{modalData?.method === 'CREATE' ? 'Créer' : 'Mettre à jour'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default ContractTypesModal;