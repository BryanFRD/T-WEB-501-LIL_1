import React, { useEffect, useState } from 'react';
import Api from '../../../api/Api';
import toast from 'react-hot-toast';
import Modal from '../../Modal';

const ClientsModal = ({modalData, show, setShow, setDataList}) => {
  const [data, setData] = useState({
    lastname: '',
    firstname: '',
    userData: null,
    deletedAt: false
  });
  
  const handleChange = (e) => {
    if(!e || !e.target){
      setData(oldValue => ({...oldValue, userData: e}));
      return;
    }
    setData(oldValue => ({...oldValue, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataEntries = Object.fromEntries(formData);
    dataEntries.deletedAt = dataEntries.deletedAt ? new Date() : null;
    
    if(modalData?.method === 'CREATE'){
      Api.post('/clients', dataEntries)
        .then(({data}) => {
          dataEntries.id = data.model.id;
          if(data.success){
            setDataList(oldValue => [...oldValue, dataEntries]);
            
            if(dataEntries.deletedAt){
              Api.delete(`/clients/${data.model.id}`)
                .then((res) => {})
                .catch((err) => {});
            }
            
            setShow(false);
            toast.success('Client mis à jour avec succès !');
            return;
          }
          toast.error('Erreur lors de la mise à jour du client !');
        })
        .catch(() => {
          toast.error('Erreur lors de la mise à jour du client !');
        });
        
      return;
    }
    
    if(modalData.data?.deletedAt !== data?.deletedAt){
      Api.delete(`/clients/${modalData.data.id}${modalData.data.deletedAt ? '/restore' : ''}`)
      .then(() => modalData.updateData({...modalData.data, deletedAt: !modalData.data.deletedAt ? new Date() : null}))
      .catch(() => {});
    }
    
    Api.put(`/clients/${modalData.data.id}`, dataEntries, {params: {deleted: true}})
      .then(({data}) => {
        if(data.success){
          if(modalData?.updateData){
            modalData.updateData(data.model);
            if(!data.model?.associatedId){
              modalData.updateData({...data.model, userData: {email: 'Utilisateur introuvable !'}});
            } else {
              Api.get(`/clients/${data.model?.id}/userdata`)
                .then((resp) => modalData.updateData({...data.model, userData: resp.data.model, associatedId: resp.data.model.id}))
                .catch(() => modalData.updateData({...data.model, userData: {email: 'Utilisateur introuvable !'}}));
            }
          }
          
          setShow(false)
          toast.success('Client mis à jour avec succès !');
          return;
        }
        toast.error('Erreur lors de la mise à jour du client !');
      })
      .catch(() => {
        toast.error('Erreur lors de la mise à jour du client !');
      });
  }
  
  const loadUserData = async (id) => {
    if(!id)
      return null;
  
    await Api.get(`/clients/${id}/userdata`, {params: {deleted: true}})
      .then(({data}) => setData(oldValue => {
        if(!data.model)
          return ({...oldValue, userData: null});
        
        return ({...oldValue, userData: data});
      }))
      .catch(() => setData(oldValue => ({...oldValue, userData: null})));
  }
  
  useEffect(() => {
    setData(() => {
      if(modalData?.method === 'CREATE'){
        return {
          lastname: '',
          firstname: '',
          userData: null,
          deletedAt: false
        };
      }
      
      modalData.data.userData = null;
      modalData.data.deletedAt = Boolean(modalData.data.deletedAt);
      return modalData.data;
    });
    
    loadUserData(modalData?.data?.id);
  }, [modalData]);
  
  return (
    <Modal show={show} title={'admin'} setShow={setShow}>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label>Nom:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.lastname} placeholder='Nom' name='lastname' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Prénom:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.firstname} placeholder='Prénom' name='firstname' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Email:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.userData?.email} placeholder='Email' name='email' onChange={handleChange}/>
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

export default ClientsModal;