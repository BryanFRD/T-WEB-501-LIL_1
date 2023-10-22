import { useContext, useEffect, useState } from 'react';
import {UserContext} from '../contexts/UserContext';
import Api from '../api/Api';
import AdsModal from '../components/admins/ads/AdsModal';
import AdsCards from '../components/admins/ads/AdsCards';

const CompanyAdsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({method: 'CREATE', data: undefined, updateData: undefined});
  const {user} = useContext(UserContext);
  const [data, setData] = useState([]);
  
  const handleModalData = (method, show, defaultData, setData) => {
    setShowModal(show ?? true);
    setModalData(() => ({method: method ?? 'CREATE', data: defaultData, updateData: setData}));
  }
  
  useEffect(() => {
    if(!user){
      setData([]);
      return;
    }
    
    Api.get(`/companies/${user.id}/ads`, {params: {deleted: true}})
      .then(({data}) => setData(data.models))
      .catch(() => setData([]));
  }, [user]);
  
  useEffect(() => {
    console.log(data)
  }, [data])
  
  return (
    <div className='flex justify-center items-center'>
      {data?.length > 0 ?
        <div className='flex flex-col gap-8 my-8'>
          {data.map(ad => <AdsCards key={ad.id} data={ad} handleModalData={handleModalData}/>)}
          <AdsModal setDataList={setData} modalData={modalData} setShow={setShowModal} show={showModal} />
        </div>
        :
        <h2 className='text-xl mt-8'>Vous n'avez pas encore d'annonces !</h2>
      }
    </div>
  );
};

export default CompanyAdsScreen;