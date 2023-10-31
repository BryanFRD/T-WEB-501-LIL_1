import axios from 'axios';

export let handleLogout;

const Api = axios.create({
  baseURL: 'http://localhost:3002/',
  withCredentials: true
});

Api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if(!error.config.url.includes('/auth/') && error.response?.status === 401 && !originalRequest.retry){
    originalRequest.retry = true;
    
    refreshToken();
    
    return Api(originalRequest);
  }
  
  return Promise.reject(error.response);
});

export const refreshToken = async () => { 
    return Api.post('auth/refresh')
      .then(response => {
        if(!response)
          return;
        
        return {...response.data};
      }, error => {
        if(handleLogout)
          handleLogout();
        
        return error;
    });
}

export default Api;