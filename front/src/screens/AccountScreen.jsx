import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import AdminAccountForm from '../components/accounts/AdminAccountForm';
import CompanyAccountForm from '../components/accounts/CompanyAccountForm';
import ClientAccountForm from '../components/accounts/ClientAccountForm';
import UserDataEmailAccountForm from '../components/accounts/UserDataEmailAccountForm';
import Api from '../api/Api';
import toast from 'react-hot-toast';
import UserDataPasswordAccountForm from '../components/accounts/UserDataPasswordAccountForm';

const AccountScreen = () => {
  const {user} = useContext(UserContext);
  const [data, setData] = useState(user);
  
  const handleInputChange = (e) => {
    setData(oldValue => ({...oldValue, [e.target.name]: e.target.value}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Api.put((user?.isAdmin ? '/admins' : user?.isCompany ? '/companies' : '/clients') + `/${user.id}`, data)
      .then(() => toast.success('Compte mis à jour avec succès !'))
      .catch(() => toast.error('Erreur lors de la mise à jour du compte !'));
  }
  
  return (
    <div className='flex flex-col gap-4 contain justify-center items-center'>
      <div className='flex flex-col md:flex-row gap-4 m-10'>
        <h2 className='text-3xl'>Paramètre utilisateur</h2>
      </div>
      {user?.isAdmin ? (
        <AdminAccountForm {...{handleSubmit, data, handleInputChange}}/>
      ) : user?.isCompany ? (
        <CompanyAccountForm handleSubmit={handleSubmit}/>
      ) : (
        <ClientAccountForm handleSubmit={handleSubmit}/>
      )}
      <hr className='w-2/4 my-8 border-2 rounded'/>
      <UserDataEmailAccountForm />
      <hr className='w-2/4 my-8 border-2 rounded'/>
      <UserDataPasswordAccountForm />
    </div>
  );
};

export default AccountScreen;