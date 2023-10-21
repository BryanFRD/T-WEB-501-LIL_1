import { useState } from 'react';
import Api from '../../api/Api';
import Input from '../form/Input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ClientRegisterForm = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setErrors([]);
    Api.post('/auth/register', data)
      .then(() => {
        toast.success('Compte créé !');
        navigate('/');
      })
      .catch(({data}) => {
        if(!data?.message?.details){
          toast.error('Email déjà utilisé !');
          return;
        }
        
        setErrors(() => {
          const errors = {};
          for(const error of data.message.details){
            if(!errors[error.key])
              errors[error.key] = [];
            
            if(!errors[error.key].includes(error.message))
              errors[error.key].push(error.message);
          }
          
          return errors;
        });
      });
  }
  
  return (
    <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 flex flex-col gap-6">
      <Input errors={errors.firstname} title={'Prénom'} placeholder={'Prénom'} name={'firstname'}/>
      <Input errors={errors.lastname} title={'Nom'} placeholder={'Nom'} name={'lastname'}/>
      <Input errors={errors.email} title={`Email`} placeholder={'exemple@jobhub.fr'} name={'email'}/>
      <Input errors={errors.phonenumber} title={'Numéro de téléphone'} placeholder={'0612345678'} name={'phonenumber'} />
      <Input errors={errors.password} title={'Mot de passe'} placeholder={'********'} name={'password'} type='password'/>
      <div className="flex flex-col items-start justify-between">
        <button className="px-4 py-2 font-semibold transition-all bg-primary hover:bg-primary-darker text-white rounded focus:outline-none focus:shadow-outline" type="submit">
          S'enregistrer
        </button>
      </div>
    </form>
  );
};

export default ClientRegisterForm;