import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';



const ProtectedRouter = ({ children }) => {
   
  const  user  = useSelector((state) => state.user.userToken);
  return user ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRouter;
