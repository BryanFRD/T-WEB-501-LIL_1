import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../components/header/Header';

const BaseScreen = () => {
  return (
    <>
      <Header />
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