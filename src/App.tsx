import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { AppState } from './redux/store';
import Profile from './pages/Profile';

function App(): JSX.Element {
  const account = useSelector((state: AppState) => {
    return state.account.value;
  });

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: !!account,
    authenticationPath: '/login',
  };

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' replace />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Dashboard />} />} ></Route>
      <Route path='/profile' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Profile />} />} ></Route>
    </Routes>
  );
}

export default App;
