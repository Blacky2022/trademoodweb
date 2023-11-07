import React from 'react';
import { AuthProvider } from '../store/AuthProvider';
import AppRoutes from './AppRoutes';
import { InstrumentProvider } from '../store/InstrumentProvider';

export default function Providers() {
  return (
    <AuthProvider>
      <InstrumentProvider>
      <AppRoutes />
      </InstrumentProvider>
    </AuthProvider>
  );
}
