import React, { useState } from 'react';
import ClientRegisterForm from '../components/register/ClientRegisterForm';
import CompanyRegisterForm from '../components/register/CompanyRegisterForm';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  const [tab, setTab] = useState('client');
  
  return (
    <div className='flex justify-center align-center'>
      <Link></Link>
      <div className='p-16 w-full md:w-1/2 lg:w-1/3'>
        <div className="text-sm font-medium text-center">
            <ul className="grid grid-cols-2">
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