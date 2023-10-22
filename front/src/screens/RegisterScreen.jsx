import { useState } from 'react';
import ClientRegisterForm from '../components/register/ClientRegisterForm';
import CompanyRegisterForm from '../components/register/CompanyRegisterForm';

const RegisterScreen = () => {
  const [tab, setTab] = useState('client');
  
  return (
    <div className='flex flex-col justify-center align-center gap-8'>
      <h1 className='text-center text-4xl mt-8 font-semibold'>Inscription</h1>
      <div className='md:p-16 w-full md:w-2/3 xl:w-3/5 mx-auto'>
        <div className="text-sm font-medium text-center">
            <ul className="grid md:grid-cols-2">
                <li className='w-full hover:bg-slate-100'>
                    <button className={`min-w-full p-4 rounded-t-lg border-b-2 ${tab === 'client' && 'border-primary'}`} onClick={() => setTab("client")}>Client</button>
                </li>
                <li className='w-full hover:bg-slate-100'>
                    <button className={`min-w-full p-4 rounded-t-lg border-b-2 ${tab === 'company' && 'border-primary'}`} onClick={() => setTab("company")}>Entreprise</button>
                </li>
            </ul>
        </div>
        {tab === 'client' ? (<ClientRegisterForm />) : (<CompanyRegisterForm />)}
      </div>
    </div>
  );
};

export default RegisterScreen;