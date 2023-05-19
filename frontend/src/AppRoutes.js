import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import SignUpForm from "./user/SignUpForm";
import LoginForm from "./user/LoginForm";
import JoblyApi from "./api.js";
import useLocalStorage from "./hooks/useLocalStorage";
import Logout from "./user/Logout";
import CompanyList from "./company/CompanyList";
import CompanyDetails from "./company/CompanyDetails";
import JobList from "./job/JobList";
import JobDetails from "./job/JobDetails";
import Profile from "./user/Profile";
import jwt from "jwt-decode";
import UserContext from "./user/UserContext";

function AppRoutes() {
  const [token, setToken] = useLocalStorage("token");
  const [user, setUser] = useState();

  useEffect(() => {
    // get user info on load
    async function getUser(username) {
      const user = await JoblyApi.getUser(username);
      setUser(user);
    }
    
    try{
      const decoded = jwt(token);
      const username = decoded.username;
      getUser(username);
    } catch(e) {
      // if problems with token unset user
      setUser(null);
    }
  },[token])

  async function register(registrationData) {
      const token = await JoblyApi.register(registrationData);
      // store token in local storage
      setToken(token);
      return token;
  }

  async function login(loginData) {
    const token = await JoblyApi.login(loginData);
    setToken(token);
    return token;
  }

  async function updateUser(userData) {
    const {username, ...postData} = userData;
    const user = await JoblyApi.updateUser(username, postData);
    setUser(user);
    return user;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/jobs/:id" element={<JobDetails />}/>
          <Route path="/jobs" element={<JobList />}/>
          <Route path="/companies/:handle" element={<CompanyDetails />}/>
          <Route path="/companies" element={<CompanyList />}/>
          <Route path="/profile" element={<Profile user={user} updateUser={updateUser}/>}/>
          <Route path="/signup" element={<SignUpForm signup={register}/>} />
          <Route path="/login" element={<LoginForm login={login}/>} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="*" element={NotFound} />
        </Routes>
      </UserContext.Provider>
      
    </BrowserRouter>
  );
}

export default AppRoutes;