import React, { useState } from 'react';
import Input from '../form/Input';
import Api from '../../api/Api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setErrors([]);
    Api.post('/auth/login', data)
      .then(({data}) => {
        toast.success('Connecté !');
        navigate('/');
      })
      .catch(({data}) => {
        if(!data?.message?.details){
          toast.error('Email ou mot de passe introuvable !');
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
      <Input hasError={errors.includes('email')} errorMessage='Veuillez indiquer un mail valide.' title={`Email`} placeholder={'exemple@jobhub.fr'} name={'email'}/>
      <Input hasError={errors.includes('password')} errorMessage='Veuillez indiquer un mot de passe valide.' title={'Mot de passe'} placeholder={'********'} name={'password'} type='password'/>
      <div className="flex flex-col items-start justify-between">
        <button className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Connexion
        </button>
      </div>
    </form>
  );
};

export default LoginForm;