import React, { useEffect } from 'react';
import Api from '../api/Api';

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = React.useState(null);
  
  useEffect(() => {
    Api.handleLogout = handleLogout;
    
    const refreshUser = async () => {
      const userAccount = await Api.post('/auth/refresh').then(({data}) => data.model).catch(() => null);
      
      if(!userAccount){
        setUser(null);
        return;
      }
      
      const isAdmin = await Api.get('/auth/isadmin').then(() => true).catch(() => false);
      
      userAccount.isAdmin = isAdmin;
      userAccount.isCompany = userAccount?.name;
      
      setUser(userAccount);
    }
    
    refreshUser();
  }, []);
  
  const handleLogout = () => {
    Api.delete('/auth/logout').finally(() => setUser(null));
    
  }
  
  return (
    <UserContext.Provider value={{user, setUser, handleLogout}}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;