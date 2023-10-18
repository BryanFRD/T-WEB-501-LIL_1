import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Api from '../../api/Api';
import toast from 'react-hot-toast';

const UserDataEmailAccountForm = () => {
  const {user} = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  
  const handleInputChange = (e) => {
    setData(oldValue => ({...oldValue, [e.target.name]: e.target.value}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!data.email || data.email.length == 0 || !data.password || data.password.length == 0){
      return toast.error('Veuillez remplir tous les champs !');
    }
    
    Api.put(`userdata/${data.id}`, data)
      .then(() => toast.success('Compte mis à jour avec succès !'))
      .catch(() => toast.error('Erreur lors de la mise à jour du compte !'));
  }
  
  useEffect(() => {
    Api.get((user?.isAdmin ? '/admins' : user?.isCompany ? '/companies' : '/clients') + `/${user.id}/userdata`)
      .then(({data}) => setData({id: data.id, email: data.model?.email, password: ''}))
      .catch(() => {})
  }, [user])
  
  return (
    <form className='w-3/4 flex flex-col gap-8' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        <label>Email:</label>
        <input type="text" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2 md:col-span-2 lg:col-span-4' value={data?.email} placeholder='exemple@jobhub.fr' name='email' onChange={handleInputChange}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        <label>Mot de passe:</label>
        <input type="password" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2 md:col-span-2 lg:col-span-4' value={data?.password} placeholder='Mot de passe' name='password' onChange={handleInputChange}/>
      </div>
      <button className='px-4 py-2 ms-auto bg-green-600 hover:bg-green-700 text-white font-semibold rounded'>Changer</button>
    </form>
  );
};

export default UserDataEmailAccountForm;