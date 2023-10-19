import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import Api from '../../../api/Api';
import { UserContext } from '../../../contexts/UserContext';
import { Link } from 'react-router-dom';

const AdsCards = ({data, handleModalData}) => {
  const {user} = useContext(UserContext);
  const [dt, setDt] = useState(data);
  
  const handleUpdate = () => {
    handleModalData('UPDATE', true, dt, setDt);
  }
  
  const handleDelete = () => {
    Api.delete(`/ads/${dt.id}${dt.deletedAt ? '/restore' : ''}`)
      .then(() => setDt(oldValue => ({...oldValue, deletedAt: !oldValue.deletedAt ? new Date() : null})))
      .catch(() => {});
  }
  
  useEffect(() => {
    if(!data?.companyId){
      setDt(oldValue => ({...oldValue, company: {email: 'Entreprise introuvable !'}}));
    }
    
    if(!data?.contractTypes?.length == 0){
      setDt(oldValue => ({...oldValue, contract: 'Aucun type de contrat !'}));
    }
    
    if(data?.companyId){
      Api.get(`/ads/${data.id}/company`, {params: {deleted: true}})
        .then((resp) => setDt(oldValue => ({...oldValue, company: resp.data.model})))
        .catch(() => setDt(oldValue => ({...oldValue, company: {name: 'Entreprise introuvable !'}})));
    }
    
    if(!data?.contractTypes?.length > 0){
      Api.get(`/ads/${data.id}/contracttypes`, {params: {deleted: true}})
        .then((resp) => setDt(oldValue => {
          if(!resp.data?.models?.length)
            return ({...oldValue, contract: 'Aucun type de contrat !'});
          
          return ({...oldValue, contract: resp.data.models.reduce((acc, {name}) => `${acc} ${name}`, '')});
        }))
        .catch(() => setDt(oldValue => ({...oldValue, contract: 'Aucun type de contrat !'})));
    }
  }, [data]);
  
  return (
    <div className='flex flex-col md:flex-row p-4 w-full justify-between bg-slate-100 rounded gap-4'>
      <div className='flex flex-col justify-between gap-4'>
        <div className='flex flex-wrap gap-4'>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Titre:</span>
            <span>{dt.title}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Description:</span>
            <span>{dt.description}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Salaire:</span>
            <span>{dt.wages}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Lieu:</span>
            <span>{dt.place}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Heure de travail:</span>
            <span>{dt.workingTime}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Status:</span>
            <span>{dt.status}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Contrat:</span>
            <span>{dt.contract}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Entreprise:</span>
            <span>{dt.company?.name}</span>
          </div>
        </div>
        <div className='flex gap-4 flex-col lg:flex-row text-slate-500 text-sm sm:text-base'>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Créé le:</span>
            <span>{moment(dt.createdAt).format('DD/MM/YYYY')}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Mis à jour le:</span>
            <span>{moment(dt.updatedAt).format('DD/MM/YYYY')}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span className='whitespace-nowrap'>Supprimé{dt.deletedAt ? ' le' : ''}:</span>
            <span className={`${dt.deletedAt ? 'text-red-600' : 'text-green-600'}`}>{dt.deletedAt ? moment(dt.deletedAt).format('DD/MM/YYYY') : 'NON'}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {user?.isCompany &&
          <Link to={`/ad_details/${dt.id}`} className='py-2 px-4 text-center border-2 border-primary rounded text-primary hover:text-white hover:bg-primary transition-all font-semibold'>Voir</Link>
        }
        <button className='py-2 px-4 bg-primary hover:bg-primary-darker text-white font-semibold rounded whitespace-nowrap' onClick={handleUpdate}>Mettre à jour</button>
        <button className={`py-2 px-4 ${dt.deletedAt ? 'bg-orange-600 hover:bg-orange-700' : 'bg-red-600 hover:bg-red-700'} text-white font-semibold rounded whitespace-nowrap`} onClick={handleDelete}>{dt.deletedAt ? 'Restaurer' : 'Supprimer'}</button>
      </div>
    </div>
  );
};

export default AdsCards;