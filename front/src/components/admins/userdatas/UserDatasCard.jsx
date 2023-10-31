import { useState } from 'react';
import Api from '../../../api/Api';
import moment from 'moment';
import PropTypes from 'prop-types';

const UserDatasCard = ({data, handleModalData}) => {
  const [dt, setDt] = useState(data);
  
  const handleUpdate = () => {
    handleModalData('UPDATE', true, dt, setDt);
  }
  
  const handleDelete = () => {
    Api.delete(`/userdata/${dt.id}${dt.deletedAt ? '/restore' : ''}`)
      .then(() => setDt(oldValue => ({...oldValue, deletedAt: !oldValue.deletedAt ? new Date() : null})))
      .catch(() => {});
  }
  
  return (
    <div className='flex flex-col md:flex-row p-4 w-full justify-between bg-slate-100 rounded gap-4'>
      <div className='flex flex-col justify-between gap-4'>
        <div className='flex flex-wrap gap-4'>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Email:</span>
            <span>{dt.email}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row'>
            <span>Compte vérifié:</span>
            <span className={dt.validated ? 'text-green-600' : 'text-red-600'}>{dt.validated ? 'OUI' : 'NON'}</span>
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
        <button className='py-2 px-4 bg-primary hover:bg-primary-darker text-white font-semibold rounded whitespace-nowrap' onClick={handleUpdate}>Mettre à jour</button>
        <button className={`py-2 px-4 ${dt.deletedAt ? 'bg-orange-600 hover:bg-orange-700' : 'bg-red-600 hover:bg-red-700'} text-white font-semibold rounded whitespace-nowrap`} onClick={handleDelete}>{dt.deletedAt ? 'Restaurer' : 'Supprimer'}</button>
      </div>
    </div>
  );
};

UserDatasCard.propTypes = {
  data: PropTypes.object,
  handleModalData: PropTypes.func
}

export default UserDatasCard;