import React, { Suspense, useContext } from 'react'
import { UserContext } from './contexts/UserContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseScreen from './screens/BaseScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import ErrorScreen from './screens/ErrorScreen';
const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = React.lazy(() => import('./screens/RegisterScreen'));
const PlaceAdScreen = React.lazy(() => import('./screens/PlaceAdScreen'));
const AdminScreen = React.lazy(() => import('./screens/AdminScreen'));
const DisplayDetailsScreen = React.lazy(() => import('./screens/DisplayDetailsScreen'));
const AccountScreen = React.lazy(() => import('./screens/AccountScreen'));
const CompanyAdsScreen = React.lazy(() => import('./screens/CompanyAdsScreen'));
const AdAppliedScreen = React.lazy(() => import('./screens/AdAppliedScreen'));

function App() {
  const {user} = useContext(UserContext);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseScreen />}>
          <Route index element={<HomeScreen />}/>
          {!user && (
            <>
              <Route path='login' element={
                <Suspense fallback={<LoadingScreen />}>
                  <LoginScreen />
                </Suspense>
              }/>
              <Route path='register' element={
                <Suspense fallback={<LoadingScreen />}>
                  <RegisterScreen />
                </Suspense>  
              }/>
            </>
          )}
          {(user && !user.isCompany && !user.isAdmin) && (
            <Route path='ad_applied' element={
              <Suspense fallback={<LoadingScreen />}>
                <AdAppliedScreen />
              </Suspense>
            }/>
          )}
          {user?.isCompany &&
            <>
              <Route path='place_ad' element={
                <Suspense fallback={<LoadingScreen />}>
                  <PlaceAdScreen />
                </Suspense>
              }/>
              <Route path='company_ads' element={
                <Suspense fallback={<LoadingScreen />}>
                  <CompanyAdsScreen />
                </Suspense>
              }/>
            </>
          }
          {user?.isAdmin &&
            <Route path='admin' element={
              <Suspense fallback={<LoadingScreen />}>
                <AdminScreen />
              </Suspense>
            }/>
          }
          <Route path="ad_details/:id" element={
            <Suspense fallback={<LoadingScreen />}>
              <DisplayDetailsScreen />
            </Suspense>
          }/>
          {user &&
            <Route path='account' element={
              <Suspense fallback={<LoadingScreen />}>
                <AccountScreen />
              </Suspense>
            }/>  
          }
          <Route path='*' element={<ErrorScreen/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
