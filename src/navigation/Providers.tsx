import React from 'react';
import { AuthProvider } from '../store/AuthProvider';
import AppRoutes from './AppRoutes';

export default function Providers() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
