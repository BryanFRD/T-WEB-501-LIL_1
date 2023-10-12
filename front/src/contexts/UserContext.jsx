import React, { useEffect } from 'react';
import Api from '../api/Api';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = React.useState(null);
  
  useEffect(() => {
    Api.handleLogout = handleLogout;
    
    const refreshUser = async () => {
      const userAccount = await Api.post('/auth/refresh').then(({data}) => data.model).catch(() => null);
      
      setUser(userAccount);
    }
    
    refreshUser();
  }, []);
  
  const handleLogout = () => {
    console.log('logout')
    Api.delete('/auth/logout').then(res => console.log(res)).catch((err) => console.log(err)).finally(() => setUser(null));
    
  }
  
  return (
    <UserContext.Provider value={{user, setUser, handleLogout}}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;