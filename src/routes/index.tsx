import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import Welcome from '../pages/Welcome';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Matches from '../pages/Matches';
import NewMatch from '../pages/NewMatch';
import Statistics from '../pages/Statistics';
import Rankings from '../pages/Rankings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-tertiary-500">Chargement...</div>
    </div>;
  }
  
  return currentUser ? <>{children}</> : <Navigate to="/welcome" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-tertiary-500">Chargement...</div>
    </div>;
  }
  
  return !currentUser ? <>{children}</> : <Navigate to="/" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="welcome" element={
          <PublicRoute>
            <Welcome />
          </PublicRoute>
        } />
        <Route index element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="matches" element={
          <PrivateRoute>
            <Matches />
          </PrivateRoute>
        } />
        <Route path="matches/new" element={
          <PrivateRoute>
            <NewMatch />
          </PrivateRoute>
        } />
        <Route path="statistics" element={
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        } />
        <Route path="rankings" element={
          <PrivateRoute>
            <Rankings />
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  );
}