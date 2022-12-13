import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppState } from '../redux/store';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  roles?: string[];
  outlet: JSX.Element;
};

export default function ProtectedRoute({ isAuthenticated, authenticationPath, roles, outlet }: ProtectedRouteProps) {
  const account = useSelector((state: AppState) => {
    return state.account.value;
  });

  if (!isAuthenticated) {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }

  if (account?.role && roles && roles.indexOf(account.role) === -1) {
    return <Navigate to={{ pathname: '/404' }} />;
  }

  return outlet;
}
