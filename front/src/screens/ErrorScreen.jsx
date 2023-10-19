import React from 'react';

const ErrorScreen = () => {
  return (
    <div className='flex justify-center items-center h-full text-red-600'>
      <div className='text-center'>
        <h2 className='text-3xl'>Erreur 404</h2>
        <span className='text-xl'>Page non trouvée !</span>
      </div>
    </div>
  );
};

export default ErrorScreen;