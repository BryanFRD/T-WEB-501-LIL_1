import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../components/header/Header';

const BaseScreen = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <footer></footer>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
    </div>
  );
};

export default BaseScreen;