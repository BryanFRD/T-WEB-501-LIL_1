import React from 'react';
import Navbar from './Navbar';
import Logo from './Logo';


const Header = () => {
  return (
  <header className='border-solid border-b-2 border-slate-300
  text-center
  lg:flex lg:flex-row'>
      <Logo/>
      <Navbar/>
  </header>
  );
};

export default Header;