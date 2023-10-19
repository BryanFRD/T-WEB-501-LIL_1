import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Api from '../api/Api';
import AdAppliedCard from '../components/AdAppliedCard';

const AdAppliedScreen = () => {
  const {user} = useContext(UserContext);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    Api.get(`/clients/${user?.id}/userdata`)
      .then((resp) => {
        Api.get('/appliers', {
          params: {
            search: resp.data?.model?.email
          }
        })
          .then(({data}) => {
            setData(data.models)
          })
          .catch(() => setData([]));
      })
      .catch(() => {
        setData([]);
      })
  }, [user]);
  
  return (
    <div>
      {data?.length > 0 ?
        <div className='flex flex-col p-8 gap-4'>
          {data.map((applied) => <AdAppliedCard key={applied.id} data={applied}/>)}
        </div>
        :
        <h2>Vous n'avez jamais postulé !</h2>
      }
    </div>
  );
};

export default AdAppliedScreen;