import React, { useContext, useEffect, useState } from 'react';
import Modal from '../../Modal';
import AsyncSelect from 'react-select/async';
import Api from '../../../api/Api';
import toast from 'react-hot-toast';
import { UserContext } from '../../../contexts/UserContext';

const AdsModal = ({modalData, show, setShow, setDataList}) => {
  const {user} = useContext(UserContext);
  const [data, setData] = useState({
    title: '',
    description: '',
    wages: '',
    place: '',
    workingTime: '',
    status: 'Ouvert',
    company: null,
    contractTypes: [],
    deletedAt: false
  });
  
  const handleChange = (e) => {
    setData(oldValue => ({...oldValue, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));
  }
  
  const handleCompanyChange = (e) => {
    setData(oldValue => ({...oldValue, company: e}));
  }
  
  const handleContractTypesChange = (e) => {
    setData(oldValue => ({...oldValue, contractTypes: e}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataEntries = Object.fromEntries(formData);
    dataEntries.deletedAt = dataEntries.deletedAt ? new Date() : null;
    dataEntries.companyId = dataEntries.company !== '' ? dataEntries.company : null;
    dataEntries.contractTypes = data.contractTypes?.map(({value}) => value) ?? [];
    
    if(modalData?.method === 'CREATE'){
      Api.post('/ads', dataEntries)
        .then(({data}) => {
          dataEntries.id = data.model.id;
          if(data.success){
            setDataList(oldValue => [...oldValue, dataEntries]);
            
            if(dataEntries.deletedAt){
              Api.delete(`/ads/${data.model.id}`)
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
      Api.delete(`/ads/${modalData.data.id}${modalData.data.deletedAt ? '/restore' : ''}`)
      .then(() => modalData.updateData({...modalData.data, deletedAt: !modalData.data.deletedAt ? new Date() : null}))
      .catch(() => {});
    }
    
    Api.put(`/ads/${modalData.data.id}`, dataEntries, {params: {deleted: true}})
      .then(async ({data}) => {
        if(data.success){
          if(modalData?.updateData){
            await Api.get(`/ads/${data.model.id}/company`, {params: {deleted: true}})
              .then((resp) => {
                return modalData.updateData({...data.model, company: resp.data.model?.name})
              })
              .catch(() => {
                return modalData.updateData({...data.model, company: {name: 'Entreprise introuvable !'}})
              });
            
            await Api.get(`/ads/${data.model.id}/contracttypes`, {params: {deleted: true}})
              .then((resp) => modalData.updateData({...data.model, contractTypes: resp.data.models.reduce((acc, {name}) => `${acc}, ${name}`, '')}))
              .catch(() => modalData.updateData({...data.model, contractTypes: 'Aucun type de contrat !'}));
              console.log(data.model)
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
  
  const loadCompaniesOptions = (value) => {
    return Api.get('/companies', {params: {search: value, limit: 25}})
      .then(({data}) => {
        return data.models.map(({id, name}) => ({value: id, label: name}))
      })
      .catch(() => []);
  }
  
  const loadContractTypesOptions = (value) => {
    return Api.get('/contracttypes', {params: {search: value, limit: 25}})
      .then(({data}) => data.models.map(({id, name}) => ({value: id, label: name})))
      .catch(() => []);
  }
  
  const loadCompany = async (id) => {
    if(!id)
      return null;
  
    await Api.get(`/ads/${id}/company`, {params: {deleted: true}})
      .then(({data}) => setData(oldValue => {
        if(!data.model){
          return ({...oldValue, company: null});
        }
        
        return ({...oldValue, company: {value: data.model.id, label: data.model.name,}});
      }))
      .catch(() => setData(oldValue => ({...oldValue, company: null})));
  }
  
  const loadContractType = async (id) => {
    if(!id)
      return null;
    
    await Api.get(`/ads/${id}/contracttypes`, {params: {deleted: true}})
      .then(({data}) => setData(oldValue => {
        return ({...oldValue, contractTypes: data?.models?.map(({id, name}) => ({value: id, label: name})) ?? []});
      }))
      .catch(() => setData(oldValue => ({...oldValue, contractTypes: []})));
  }
  
  useEffect(() => {
    setData(() => {
      if(modalData?.method === 'CREATE'){
        return {
          title: '',
          description: '',
          wages: '',
          place: '',
          workingTime: '',
          status: 'Ouvert',
          company: null,
          contractTypes: [],
        };
      }
      
      modalData.data.company = null;
      modalData.data.contractTypes = null;
      modalData.data.deletedAt = Boolean(modalData.data.deletedAt);
      return modalData.data;
    });
    
    loadCompany(modalData?.data?.id);
    loadContractType(modalData?.data?.id);
  }, [modalData]);
  
  return (
    <Modal show={show} title={'annonce'} setShow={setShow}>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label>Titre:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.title} placeholder='Nom' name='title' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Description:</label>
          <textarea type="text" className='resize-none border-b-2 border-primary rounded bg-slate-200 py-1 px-2' rows={3} value={data.description} placeholder='Description' name='description' onChange={handleChange}>
          </textarea>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Salaire:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.wages} placeholder='Salaire' name='wages' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Lieu:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.place} placeholder='Lieu' name='place' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Heure de travail:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.workingTime} placeholder='Heure de travail' name='workingTime' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Status:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.status} placeholder='Status' name='status' onChange={handleChange}/>
        </div>
        {user?.isAdmin &&
          <div className='flex flex-col gap-2'>
            <label>Entreprise:</label>
            <AsyncSelect placeholder='Entreprise' defaultOptions isClearable loadOptions={loadCompaniesOptions} value={data.company} name='company' onChange={handleCompanyChange} />
          </div>  
        }
        <div className='flex flex-col gap-2'>
          <label>Types de contrat:</label>
          <AsyncSelect placeholder='Types de contrat' defaultOptions isClearable loadOptions={loadContractTypesOptions} value={data.contractTypes} name='contractTypes' onChange={handleContractTypesChange} isMulti/>
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

export default AdsModal;