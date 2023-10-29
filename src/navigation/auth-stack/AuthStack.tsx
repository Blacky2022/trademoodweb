
import { Route, Routes } from 'react-router-dom';

import RegisterPageView from '../../views/RegisterPage/RegisterPageView';

const AuthStack = () => {
  return (
    <Routes>
      <Route path='/register' element={<RegisterPageView />} />
    </Routes>
  );
};

export default AuthStack;
