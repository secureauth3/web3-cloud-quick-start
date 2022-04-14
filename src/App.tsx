import './App.css';
import  React, { useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';

// Components
import NFTs from './features/nfts/nfts';
import NFT from './features/nfts/nft/nft';
import Dashboard from './features/dashboard/dashboard';
import Nav from './features/nav/nav';
import { RequireAuth } from './features/auth/requireAuth';
import AuthPage from './features/auth/authPage';

// Secure Auth3 Auth hook

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<Nav />}>
        <Route path="/nfts"
          element={
            <RequireAuth>
              <NFTs />
            </RequireAuth>
          } 
        />
        <Route path="nfts/:id"
          element={
            <RequireAuth>
              <NFT />
            </RequireAuth>
          }
        />
        <Route path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } 
        />
      </Route>
      <Route path="*" element={<Navigate replace to="/dashboard" />} />
    </Routes>
  );
}

