import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './redux/store';
import Profile from './pages/Profile';
import { useEffect, useRef } from 'react';
import { getInfoAsync } from './redux/account.slide';

function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const account = useSelector((state: AppState) => {
    return state.account.value;
  });

  const mounted = useRef<any>();
  const { state } = useLocation();

  useEffect(() => {
    console.log("Location changed", location);
  }, [location]);
  
  useEffect(() => {
    if (!mounted.current) {
      // !componentDidMount cycle
      mounted.current = true;
      /**
       * TODO: Check token in memory. If not: call getInfo API to get token, if API return false, redirect to login page
       */
      dispatch(getInfoAsync());
    } else {
      // !componentDidUpdate cycle
      console.log('componentDidUpdate', mounted);
      const previousPath = (state as any)?.previousPath;
      if (previousPath) {
        console.log('Previous Path: ', previousPath);
      }
    }
  });

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: !!account || !!sessionStorage.getItem('account'),
    authenticationPath: '/login',
    roles: [''],
  };

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' replace />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Dashboard />} />}></Route>
      <Route path='/profile' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Profile />} />}></Route>
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>There&apos;s nothing here!</p>
          </main>
        }
      ></Route>
    </Routes>
  );
}

export default App;
