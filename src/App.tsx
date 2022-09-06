import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './redux/store';
import { useEffect, useRef } from 'react';
import { getInfoAsync } from './redux/account.slide';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Error from './pages/Error';

function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const account = useSelector((state: AppState) => {
    return state.account.value;
  });

  const mounted = useRef<any>();
  const { state } = useLocation();

  useEffect(() => {
    if (!mounted.current) {
      // !componentDidMount cycle
      mounted.current = true;
      dispatch(getInfoAsync());
    } else {
      // !componentDidUpdate cycle
      const previousPath = (state as any)?.previousPath;
      if (previousPath) {
        console.log('Previous Path: ', previousPath);
      }
    }
  });

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet' | 'roles'> = {
    isAuthenticated: !!account || !!sessionStorage.getItem('account'),
    authenticationPath: '/login',
  };

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' replace />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Dashboard />} />}></Route>
      <Route path='/profile' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Profile />} roles={['user']} />}></Route>
      <Route path='*' element={<Error />}></Route>
    </Routes>
  );
}

export default App;
