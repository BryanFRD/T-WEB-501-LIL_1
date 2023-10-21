import { useEffect, useRef, useState } from 'react';
import Api from '../api/Api';
import AdsCards from '../components/admins/ads/AdsCards';
import AdsModal from '../components/admins/ads/AdsModal';
import ContractTypesCard from '../components/admins/contracttypes/ContractTypesCard';
import ContractTypesModal from '../components/admins/contracttypes/ContractTypesModal';
import AdminsCard from '../components/admins/admins/AdminsCard';
import AdminsModal from '../components/admins/admins/AdminsModal';
import AppliersCard from '../components/admins/appliers/AppliersCard';
import AppliersModal from '../components/admins/appliers/AppliersModal';
import ClientsCard from '../components/admins/clients/ClientsCard';
import ClientsModal from '../components/admins/clients/ClientsModal';
import CompaniesCard from '../components/admins/companies/CompaniesCard';
import CompaniesModal from '../components/admins/companies/CompaniesModal';
import UserDatasCard from '../components/admins/userdatas/UserDatasCard';
import UserDatasModal from '../components/admins/userdatas/UserDatasModal';

const AdminScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({method: 'CREATE', data: undefined, updateData: undefined});
  const tabs = {
    ads: {title: 'Annonces', card: AdsCards, modal: AdsModal, url: '/ads/'},
    contracttypes: {title: 'Type de contrat', card: ContractTypesCard, modal: ContractTypesModal, url: '/contracttypes/'},
    admins: {title: 'Admin', card: AdminsCard, modal: AdminsModal, url: '/admins/'},
    appliers: {title: 'Candidatures', card: AppliersCard, modal: AppliersModal, url: '/appliers/'},
    clients: {title: 'Clients', card: ClientsCard, modal: ClientsModal, url: '/clients/'},
    companies: {title: 'Entreprises', card: CompaniesCard, modal: CompaniesModal, url: '/companies/'},
    userdatas: {title: 'Utilisateurs', card: UserDatasCard, modal: UserDatasModal, url: '/userdata/'}
  }
  
  const [tab, setTab] = useState(tabs.ads);
  const [data, setData] = useState([]);
  const [fetchOffset, setFetchOffset] = useState(0);
  const [fetchTotal, setFetchTotal] = useState(50);
  const [loading, setLoading] = useState(false);
  const divObserver = useRef();
  
  const changeTab = (tabKey) => {
    setTab(tabs[tabKey]);
  }
  
  const handleModalData = (method, show, defaultData, setData) => {
    setShowModal(show ?? true);
    setModalData(() => ({method: method ?? 'CREATE', data: defaultData, updateData: setData}));
  }
  
  useEffect(() => {
    setLoading(true);
    Api.get(tab.url, {params: {offset: 0, limit: 10, deleted: true}})
      .then(({data}) => {
        setFetchTotal(data.total);
        setData(data.models);
        setFetchTotal(data.total);
      })
      .catch(() => {
        setFetchTotal(0);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [tab, data.url, fetchOffset]);
  
  // const handleIntersection = (entries) => {
  //   console.log('Observer: ', entries[0].isIntersecting, fetchTotal, fetchOffset, fetchTotal > fetchOffset, !loading)
  //   if(entries[0].isIntersecting && fetchTotal > fetchOffset && !loading){
  //     setFetchOffset(oldValue => oldValue + 5);
  //   }
  // }
  
  // useEffect(() => {
  //   setData([]);
  //   setFetchOffset(0);
  //   setFetchTotal(50);
  //   const observer = new IntersectionObserver(handleIntersection, {threshold: 1});
    
  //   if(divObserver.current){
  //     observer.observe(divObserver.current);
  //   }
    
  //   return () => {
  //     if(divObserver.current){
  //       observer.unobserve(divObserver.current);
  //     }
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [divObserver])
  
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col md:flex-row gap-4 justify-between items-center py-6 px-8'>
        <h2 className='text-2xl font-semibold'>{tab?.title.toUpperCase() ?? ''}</h2>
        <button className='bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white font-semibold' onClick={() => handleModalData()}>Ajouter</button>
      </div>
      <div>
        <div>
          <ul className='flex overflow-x-auto pb-3 min-w-full'>
            {
              Object.entries(tabs).map(([key, value]) => (<li key={key} className={`flex-grow ${(value.title === tab?.title) && 'border-primary'} border-b-2 hover:border-primary text-center whitespace-nowrap hover:bg-slate-100`}><button className='w-full h-full py-2 px-4' onClick={() => changeTab(key)}>{value.title}</button></li>))
            }
          </ul>
        </div>
        <div className='flex flex-col items-center sm:p-8 gap-4'>
          {data?.length > 0 ?
            <>
              {data.map(dt => (<tab.card key={dt.id} data={dt} handleModalData={handleModalData}/>))}
              {loading && <h2 className='text-xl py-4'>Chargement...</h2>}
            </>
            :
            (<h2 className='text-xl py-4'>Aucune donnée n'est disponible !</h2>)
          }
        <div ref={divObserver}></div>
        </div>
      </div>
      <tab.modal modalData={modalData} show={showModal} setShow={setShowModal} setDataList={setData}/>
    </div>
  );
};

export default AdminScreen;