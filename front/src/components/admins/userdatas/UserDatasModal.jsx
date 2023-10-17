import React, { useEffect, useState } from 'react';
import Modal from '../../Modal';
import AsyncSelect from 'react-select/async';
import Api from '../../../api/Api';
import toast from 'react-hot-toast';

const UserDatasModal = ({modalData, show, setShow, setDataList}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    validated: true,
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
    dataEntries.validated = dataEntries.validated === 'on' ? true : false;
    
    if(modalData?.method === 'CREATE'){
      Api.post('/userdata', dataEntries)
        .then(({data}) => {
          dataEntries.id = data.model.id;
          if(data.success){
            setDataList(oldValue => [...oldValue, dataEntries]);
            
            if(dataEntries.deletedAt){
              Api.delete(`/userdata/${data.model.id}`)
                .then((res) => {})
                .catch((err) => {});
            }
            
            setShow(false);
            toast.success('Admin mis à jour avec succès !');
            return;
          }
          toast.error('Erreur lors de la mise à jour de l\'admin !');
        })
        .catch(() => {
          toast.error('Erreur lors de la mise à jour de l\'admin !');
        });
        
      return;
    }
    
    if(modalData.data?.deletedAt !== data?.deletedAt){
      Api.delete(`/userdata/${modalData.data.id}${modalData.data.deletedAt ? '/restore' : ''}`)
      .then(() => modalData.updateData({...modalData.data, deletedAt: !modalData.data.deletedAt ? new Date() : null}))
      .catch(() => {});
    }
    
    Api.put(`/userdata/${modalData.data.id}`, dataEntries, {params: {deleted: true}})
      .then(({data}) => {
        if(data.success){
          if(modalData?.updateData){
            modalData.updateData(data.model);
          }
          
          setShow(false)
          toast.success('Admin mis à jour avec succès !');
          return;
        }
        toast.error('Erreur lors de la mise à jour de l\'admin !');
      })
      .catch(() => {
        toast.error('Erreur lors de la mise à jour de l\'admin !');
      });
  }
  
  useEffect(() => {
    setData(() => {
      if(modalData?.method === 'CREATE'){
        return {
          email: '',
          password: '',
          validated: true,
          deletedAt: false
        };
      }
      
      modalData.data.password = '';
      modalData.data.deletedAt = Boolean(modalData.data.deletedAt);
      console.log(modalData.data)
      return modalData.data;
    });
  }, [modalData]);
  
  return (
    <Modal show={show} title={'Utilisateur'} setShow={setShow}>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label>Email:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.email} placeholder='Example@jobhub.fr' name='email' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Mot de passe:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.password} placeholder='Mot de passe' name='password' onChange={handleChange}/>
        </div>
        <div className='flex items-center gap-2'>
          <label>Compte validé:</label>
          <input type="checkbox" checked={data.validated} name='validated' onChange={handleChange}/>
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

export default UserDatasModal;