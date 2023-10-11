import React from 'react';
import Api from '../../api/Api';

const ClientRegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    Api.post('/auth/register', data)
      .then((data) => {
        console.log(data);
      })
      .catch(({data}) => {
        console.log(data);
      });
  }
  
  return (
    <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8">
      <div className='mb-4'>
        <label className="block text-dark text-sm font-bold mb-2" htmlFor="firstname">
          Prénom
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" name='firstname' placeholder="Prénom" />
      </div>
      <div className="mb-4">
        <label className="block text-dark text-sm font-bold mb-2" htmlFor="lastname">
          Nom
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" name='lastname' placeholder="Nom" />
      </div>
      <div className="mb-4">
        <label className="block text-dark text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" name='email' placeholder="exemple@jobhub.fr" />
      </div>
      <div className="mb-6">
        <label className="block text-dark text-sm font-bold mb-2" htmlFor="password">
          Mot&nbsp;de&nbsp;passe
        </label>
        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name='password' type="password" placeholder="******************" />
        <p className="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          S'enregistrer
        </button>
      </div>
    </form>
  );
};

export default ClientRegisterForm;