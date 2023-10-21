import React, { useState } from 'react';
import Api from '../../api/Api';
import Input from '../form/Input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ButtonLink from '../ButtonLink';

const CompanyRegisterForm = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setErrors([]);
    Api.post('/auth/register', data)
      .then((data) => {
        toast.success('Compte créé !');
        navigate('/');
      })
      .catch(({data}) => {
        console.log('response:', data);
        if(!data?.message?.details){
          toast.error('Email déjà utilisé !');
          return;
        }
        
        setErrors(() => {
          const errors = [];
          for (const key of data.message.details) {
            errors.push(key.key);
          }
          return errors;
        })
      });
  }
  
  return (
    <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 flex flex-col gap-6">
      <Input hasError={errors.includes('name')} errorMessage={'Veuillez indiquer le nom de l\'entreprise.'}  title={'Nom de l\'entreprise'} placeholder={'Nom de l\'entreprise'} name={'name'}/>
      <Input hasError={errors.includes('email')} errorMessage='Veuillez indiquer un mail valide.' title={`Email`} placeholder={'exemple@jobhub.fr'} name={'email'}/>
      <Input hassError={errors.includes('phonenumber')} errorMessage='Veuillez indiquer un numéro valide.' title={'Numéro de téléphone'} placeholder={'0612345678'} name={'phonenumber'} />
      <Input hasError={errors.includes('password')} errorMessage='Veuillez indiquer un mot de passe valide.' title={'Mot de passe'} placeholder={'********'} name={'password'} type='password'/>
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 font-semibold transition-all bg-primary hover:bg-primary-darker text-white rounded focus:outline-none focus:shadow-outline" type="submit">
          S'enregistrer
        </button>
      </div>
    </form>
  );
};

export default CompanyRegisterForm;