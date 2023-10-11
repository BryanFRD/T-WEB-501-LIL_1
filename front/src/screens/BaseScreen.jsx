import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const BaseScreen = () => {
  return (
    <>
        <Header/>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default BaseScreen;