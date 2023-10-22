import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

const ConnectedDropdown = () => {
  const {user, handleLogout} = useContext(UserContext);
  const [collapse, setCollapse] = useState(true);
  const [displayName, setDisplayName] = useState("");  
  const dropdownRef = useRef();
  
  const toggleCollapse = () => {
    setCollapse(oldValue => !oldValue);
  }
  
  const handleClose = (e) => {
    if(dropdownRef?.current && !dropdownRef.current.contains(e.target)){
      setCollapse(true)
    }
  }
  
  const handleLogoutButton = () => {
    toggleCollapse();
    handleLogout();
  }
  
  useEffect(() => {
    document.addEventListener('click', handleClose);
    
    return () => document.removeEventListener('click', handleClose)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    setDisplayName(user?.name ?? `${user.lastname} ${user.firstname}`)
  }, [user]);
  
  return (
    <div ref={dropdownRef} tabIndex={0} className='relative md:col-start-5 md:col-span-2 md:m-auto md:me-4'>
      <button className="flex items-center justify-center md:justify-between w-full py-2 pl-3 pr-4 rounded md:border-0 md:p-0 md:w-auto text-dark md:dark:hover:bg-transparent whitespace-nowrap" onClick={toggleCollapse}>{displayName}
        <svg className={`${collapse ? '-rotate-90' : ''} transition-all w-2.5 h-2.5 ml-2.5`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div className={`z-10 mt-4 w-full sm:w-min right-0 sm:right-2 ${collapse && 'hidden'} absolute font-normal bg-slate-50 divide-y divide-gray-100 sm:rounded-lg shadow w-44 dark:divide-gray-600`}>
          <ul className="py-2 text-sm text-dark" aria-labelledby="dropdownLargeButton">
            <li>
              <Link to='/account' className="block px-4 py-2 hover:bg-gray-200" onClick={toggleCollapse}>Compte</Link>
            </li>
            {(user && (!user.isCompany && !user.isAdmin)) &&
              <li>
                <Link to='/ad_applied' className="block px-4 py-2 hover:bg-gray-200" onClick={toggleCollapse}>Mes&nbsp;candidatures</Link>
              </li>
            }
            {user?.isCompany &&
              <li>
                <Link to='/company_ads' className="block px-4 py-2 hover:bg-gray-200" onClick={toggleCollapse}>Mes&nbsp;annonces</Link>
              </li>
            }
            {user?.isAdmin &&
              <li>
                <Link to='admin' className="block px-4 py-2 hover:bg-gray-200" onClick={toggleCollapse}>Admin</Link>
              </li>
            }
          </ul>
          <div className="py-1">
            <button className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-200" onClick={handleLogoutButton}>Déconnexion</button>
          </div>
      </div>
    </div>
  );
};

export default ConnectedDropdown;