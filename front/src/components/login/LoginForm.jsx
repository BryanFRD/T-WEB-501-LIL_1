import { useContext } from 'react';
import Input from '../form/Input';
import Api from '../../api/Api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const LoginForm = () => {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    Api.post('/auth/login', data)
      .then(async ({data}) => {
        const isAdmin = await Api.get('/auth/isadmin').then(() => true).catch(() => false);
      
        data.model.isAdmin = isAdmin;
        data.model.isCompany = data.model?.name;
      
        setUser(data.model);
        toast.success('Connecté !');
        navigate('/');
      })
      .catch(({data}) => {
        if(!data?.message?.details){
          toast.error('Email ou mot de passe introuvable !');
          return;
        }
      });
  }
  
  return (
    <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 flex flex-col gap-6">
      <Input title={`Email`} placeholder={'exemple@jobhub.fr'} name={'email'}/>
      <Input title={'Mot de passe'} placeholder={'********'} name={'password'} type='password'/>
      <div className="flex flex-col items-start justify-between">
        <button className="px-4 py-2 font-semibold transition-all bg-primary hover:bg-primary-darker text-white rounded focus:outline-none focus:shadow-outline" type="submit">
          Connexion
        </button>
      </div>
    </form>
  );
};

export default LoginForm;