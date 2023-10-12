import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

const ConnectedDropdown = () => {
  const {user, handleLogout} = useContext(UserContext);
  const [collapse, setCollapse] = useState(true);
  const [displayName, setDisplayName] = useState("");  
  const toggleCollapse = () => {
    setCollapse(oldValue => !oldValue);
  }
  
  useEffect(() => {
    setDisplayName(user?.name ?? `${user.lastname} ${user.firstname}`)
  }, [user]);
  
  return (
    <div className='relative md:col-start-5 md:col-span-2 md:m-auto md:me-0'>
      <button className="flex items-center justify-center md:justify-between w-full py-2 pl-3 pr-4 rounded md:border-0 md:p-0 md:w-auto text-dark md:dark:hover:bg-transparent whitespace-nowrap" onClick={toggleCollapse}>{displayName}<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg></button>
      <div className={`z-10 mt-4 ${collapse && 'hidden'} absolute font-normal bg-slate-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:divide-gray-600`}>
          <ul className="py-2 text-sm text-dark" aria-labelledby="dropdownLargeButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">Settings</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">Earnings</a>
            </li>
          </ul>
          <div className="py-1">
            <button className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-200" onClick={handleLogout}>Sign out</button>
          </div>
      </div>
    </div>
  );
};

export default ConnectedDropdown;