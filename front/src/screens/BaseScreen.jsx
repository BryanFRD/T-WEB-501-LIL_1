import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Toaster } from 'react-hot-toast';

const BaseScreen = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet />
      </main>
      <footer></footer>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
    </>
  );
};

export default BaseScreen;