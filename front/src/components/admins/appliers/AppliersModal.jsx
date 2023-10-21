import { useEffect, useState } from 'react';
import Modal from '../../Modal';
import AsyncSelect from 'react-select/async';
import Api from '../../../api/Api';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const AppliersModal = ({modalData, show, setShow, setDataList}) => {
  const [data, setData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    description: '',
    phonenumber: '',
    ad: null,
    deletedAt: false
  });
  
  const handleChange = (e) => {
    if(!e || !e.target){
      setData(oldValue => ({...oldValue, ad: e}));
      return;
    }
    setData(oldValue => ({...oldValue, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataEntries = Object.fromEntries(formData);
    dataEntries.deletedAt = dataEntries.deletedAt ? new Date() : null;
    dataEntries.adId = dataEntries.ad !== '' ? dataEntries.ad : null;
    
    if(modalData?.method === 'CREATE'){
      Api.post('/appliers', dataEntries)
        .then(({data}) => {
          dataEntries.id = data.model.id;
          if(data.success){
            setDataList(oldValue => [...oldValue, dataEntries]);
            
            if(dataEntries.deletedAt){
              Api.delete(`/appliers/${data.model.id}`)
                .then((res) => {})
                .catch((err) => {});
            }
            
            setShow(false);
            toast.success('Candidature mise à jour avec succès !');
            return;
          }
          toast.error('Erreur lors de la mise à jour de la candidature !');
        })
        .catch(() => {
          toast.error('Erreur lors de la mise à jour de la candidature !');
        });
        
      return;
    }
    
    if(modalData.data?.deletedAt !== data?.deletedAt){
      Api.delete(`/appliers/${modalData.data.id}${modalData.data.deletedAt ? '/restore' : ''}`)
      .then(() => modalData.updateData({...modalData.data, deletedAt: !modalData.data.deletedAt ? new Date() : null}))
      .catch(() => {});
    }
    
    Api.put(`/appliers/${modalData.data.id}`, dataEntries, {params: {deleted: true}})
      .then(({data}) => {
        if(data.success){
          if(modalData?.updateData){
            modalData.updateData(data.model);
            if(!data.model?.associatedId){
              modalData.updateData({...data.model, ad: {title: 'Annonce introuvable !'}});
            } else {
              Api.get(`/appliers/${data.model?.id}/ad`)
                .then((resp) => modalData.updateData({...data.model, ad: resp.data.model, associatedId: resp.data.model.id}))
                .catch(() => modalData.updateData({...data.model, ad: {title: 'Annonce introuvable !'}}));
            }
          }
          
          setShow(false)
          toast.success('Candidature mise à jour avec succès !');
          return;
        }
        toast.error('Erreur lors de la mise à jour de la candidature !');
      })
      .catch(() => {
        toast.error('Erreur lors de la mise à jour de la candidature !');
      });
  }
  
  const loadOptions = (value) => {
    return Api.get('/ads', {params: {search: value, limit: 25, deleted: true}})
      .then(({data}) => data.models.map(({id, title}) => ({value: id, label: title})))
      .catch(() => []);
  }
  
  const loadAd = async (id) => {
    if(!id)
      return null;
  
    await Api.get(`/appliers/${id}/ad`, {params: {deleted: true}})
      .then(({data}) => setData(oldValue => {
        if(!data.model)
          return ({...oldValue, ad: null});
        
        return ({...oldValue, ad: {value: data.model.id, label: data.model.title}});
      }))
      .catch(() => setData(oldValue => ({...oldValue, ad: null})));
  }
  
  useEffect(() => {
    setData(() => {
      if(modalData?.method === 'CREATE'){
        return {
          lastname: '',
          firstname: '',
          email: '',
          description: '',
          phonenumber: '',
          ad: null,
          deletedAt: false
        };
      }
      
      modalData.data.ad = null;
      modalData.data.deletedAt = Boolean(modalData.data.deletedAt);
      return modalData.data;
    });
    
    loadAd(modalData?.data?.id);
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
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.email} placeholder='exemple@jobhub.fr' name='email' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Téléphone:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.phonenumber} placeholder='0712345678' name='phonenumber' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Description:</label>
          <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2' value={data.description} placeholder='Description' name='description' onChange={handleChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label>Annonce:</label>
          <AsyncSelect placeholder='Annonce' defaultOptions isClearable loadOptions={loadOptions} value={data.ad} name='ad' onChange={handleChange} />
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

AppliersModal.propTypes = {
  modalData: PropTypes.object,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setDataList: PropTypes.func
}

export default AppliersModal;