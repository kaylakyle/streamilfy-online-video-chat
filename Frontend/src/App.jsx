import React from 'react'
import {Route ,Routes} from 'react-router'
import toast, { Toaster } from "react-hot-toast";

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { axiosInstance } from './lib/axios.js';

const App = () => {
  const {data:authData, isLoading, error} = useQuery({ 
  queryKey: ["authUser"],

    queryFn: async () => {
      const res = awaitInstance.get("auth/me");
      return res.data;
    },
  });

  const authUser = authData?.user
  return (
    <div className="h-screen"  data-theme="night">
   {/* <button onClick={() => toast.success("hello world")}>
        create a toast
      </button> */}
      <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

      </Routes>

      <Toaster/>
 
    </div>
  )
}

export default App

//TO DO LIST

// npm i react-hot-toast
// axios
// react query Tanstack query  useeffect why use tanstack
//tanstack.com documentation installation

