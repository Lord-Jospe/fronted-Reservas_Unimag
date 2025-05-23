import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './routes/AppRouter.tsx';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './auth/authProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  </React.StrictMode>,
)
