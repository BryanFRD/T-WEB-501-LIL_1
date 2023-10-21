import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import toast from 'react-hot-toast';
import Api from '../../api/Api';

const UserDataPasswordAccountForm = () => {
  const {user} = useContext(UserContext);
  const [data, setData] = useState({
    password: '',
    newPassword: '',
    confirmedPassword: ''
  });
  
  const handleInputChange = (e) => {
    setData(oldValue => ({...oldValue, [e.target.name]: e.target.value}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!data.newPassword || data.newPassword.length == 0 || (data.newPassword !== data.confirmedPassword)){
      return toast.error('Les mots de passe ne correspondent pas !');
    }
    
    Api.put(`userdata/${data.id}`, data)
      .then(() => toast.success('Compte mis à jour avec succès !'))
      .catch(() => toast.error('Erreur lors de la mise à jour du compte !'));
  }
  
  useEffect(() => {
    Api.get((user?.isAdmin ? '/admins' : user?.isCompany ? '/companies' : '/clients') + `/${user.id}/userdata`)
      .then(({data}) => setData(oldValue => ({...oldValue, id: data.model.id})))
      .catch(() => {})
  }, [user])
  
  return (
    <form className='w-3/4 flex flex-col gap-8' onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        <label className='col-span-1 md:col-span-2 lg:col-span-1 whitespace-nowrap'>Mot de passe actuel:</label>
        <input type="password" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2 md:col-span-2 lg:col-span-4' value={data?.password} placeholder='Mot de passe' name='password' onChange={handleInputChange}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        <label className='col-span-1 md:col-span-2 lg:col-span-1 whitespace-nowrap'>Nouveau mot de passe:</label>
        <input type="password" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2 md:col-span-2 lg:col-span-4' value={data?.newPassword} placeholder='Mot de passe' name='newPassword' onChange={handleInputChange}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        <label className='col-span-1 md:col-span-2 lg:col-span-1 whitespace-nowrap'>Confirmez le mot de passe:</label>
        <input type="password" className='border-b-2 border-primary rounded bg-slate-200 py-1 px-2 md:col-span-2 lg:col-span-4' value={data?.confirmedPassword} placeholder='Mot de pass' name='confirmedPassword' onChange={handleInputChange}/>
      </div>
      <button className='px-4 py-2 ms-auto bg-green-600 hover:bg-green-700 text-white font-semibold rounded'>Changer</button>
    </form>
  );
};

export default UserDataPasswordAccountForm;