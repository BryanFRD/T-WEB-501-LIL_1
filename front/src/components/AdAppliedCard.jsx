import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../api/Api';

const AdAppliedCard = ({data}) => {
  const [dt, setDt] = useState(data);
  
  useEffect(() => {
    Api.get(`/ads/${data?.adId}/company`)
      .then(({data}) => setDt(oldValue => ({...oldValue, company: data.model})))
      .catch(() => setDt(oldValue => ({...oldValue, company: {name: 'Entreprise introuvable !'}})));
  }, [data]);
  
  return (
    <div className='flex justify-between bg-slate-100 p-4'>
      <div className='flex flex-col'>
        <div className='flex gap-2'>
          <span>Nom:</span>
          <span>{dt?.lastname}</span>
        </div>
        <div className='flex gap-2'>
          <span>Prénom:</span>
          <span>{dt?.firstname}</span>
        </div>
        <div className='flex gap-2'>
          <span>Email:</span>
          <span>{dt?.email}</span>
        </div>
        <div className='flex gap-2'>
          <span>Téléphone:</span>
          <span>{dt?.phonenumber}</span>
        </div>
        <div className='flex gap-2'>
          <span>Entreprise:</span>
          <span>{dt?.company?.name}</span>
        </div>
      </div>
      <div>
        <Link to={`/ad_details/${data?.adId}`} className='px-4 py-2 border-2 rounded'>Voir</Link>
      </div>
    </div>
  );
};

export default AdAppliedCard;