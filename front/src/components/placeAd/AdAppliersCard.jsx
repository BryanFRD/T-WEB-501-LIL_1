import moment from 'moment';
import PropTypes from 'prop-types';

const AdAppliersCard = ({applier}) => {
  
  return (
    <div className='flex flex-col p-4 w-full shadow appearance-none border rounded text-dark leading-tight focus:outline-none focus:shadow-outline gap-8 mx-12'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex gap-2'>
          <span>Nom:</span>
          <span>{applier?.lastname}</span>
        </div>
        <div className='flex gap-2'>
          <span>Prénom:</span>
          <span>{applier?.firstname}</span>
        </div>
        <div className='flex gap-2'>
          <span>Email:</span>
          <span>{applier?.email}</span>
        </div>
        <div className='flex gap-2'>
          <span>Téléphone:</span>
          <span>{applier?.phonenumber}</span>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <span>Description:</span>
        <span className='max-h-24 overflow-auto bg-slate-100 rounded p-4'>{applier?.lastname}</span>
      </div>
      <div>
        <span>Envoyé le:</span>
        <span>{moment(applier?.createdAt).format('DD/MM/YYYY')}</span>
      </div>
    </div>
  );
};

AdAppliersCard.propTypes = {
  applier: PropTypes.object.isRequired
}

export default AdAppliersCard;