import CopyrightIcon from '../icons/CopyrightIcon';

const Footer = () => {
  return (
    <footer className='mt-8 p-2 shadow appearance-none border rounded text-dark leading-tight focus:outline-none focus:shadow-outline'>
      <div className='flex justify-center gap-2 mt-auto mb-auto'>
        <CopyrightIcon/>
        <p>JobHub - Epitech Project - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;