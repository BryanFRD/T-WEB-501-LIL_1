import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


const BaseScreen = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
    </div>
  );
};

export default BaseScreen;