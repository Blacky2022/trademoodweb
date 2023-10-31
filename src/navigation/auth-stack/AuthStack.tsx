
import { Route, Routes } from 'react-router-dom';
import LoginPageView from '../../views/LoginPage/LoginPageView';
import RegisterPageView from '../../views/RegisterPage/RegisterPageView';
import ForgotPasswordView from '../../views/ForgotPassword/ForgotPasswordView';

const AuthStack = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPageView />} />
      <Route path='/register' element={<RegisterPageView />} />
      <Route path='/forgotPassword' element={<ForgotPasswordView />} />
    </Routes>
  );
};

export default AuthStack;
