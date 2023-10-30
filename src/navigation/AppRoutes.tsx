import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';
import { onAuthStateChanged } from 'firebase/auth';
import HomeStack from './home-stack/HomeStack';
import AuthStack from './auth-stack/AuthStack';
import { auth } from '../config/firebase-config';

function AppRoutes() {
  const { user, setUser } = useAuth();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
	  console.log('User status on component mount:', user)
      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber; // unsubscribe on unmount
  }, [initializing, setUser]);

  if (initializing) {
    return null; // or some kind of loader
  }

  return (
    <Routes>
      <Route path='/*' element={user ?  <HomeStack />: <AuthStack /> } />
    </Routes>
  );
}

export default AppRoutes;
