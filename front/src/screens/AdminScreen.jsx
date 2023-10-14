import React, { useState } from 'react';

const AdminScreen = () => {
  const [modalValue, setModalValue] = useState({});
  const tabs = {
    ads: {title: 'Annonces', component: ()},
    contracttypes: {title: 'Type de contrat', component: ()},
    admins: {title: 'Admin', component: ()},
    appliers: {title: 'Candidatures', component: ()},
    clients: {title: 'Clients', component: ()},
    companies: {title: 'Entreprises', component: ()},
    userdatas: {title: 'Utilisateurs', component: ()}
  }
  
  return (
    <div className='flex flex-col gap-4'>
    <div>
      <h2></h2>
      <button>Ajouter</button>
    </div>
    <div>
      
    </div>
    </div>
  );
};

export default AdminScreen;