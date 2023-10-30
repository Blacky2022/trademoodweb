
import { Route, Routes } from 'react-router-dom';
import LoginPageView from '../../views/LoginPage/LoginPageView';
import RegisterPageView from '../../views/RegisterPage/RegisterPageView';

const AuthStack = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPageView />} />
      <Route path='/register' element={<RegisterPageView />} />
    </Routes>
  );
};

export default AuthStack;
