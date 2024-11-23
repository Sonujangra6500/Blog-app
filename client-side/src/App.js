import React, { useState } from 'react';
import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/account/Login';
import Signup from './components/account/Signup';
import HomePage from './components/homePage/HomePage';
import Navbar from './components/navbar/Navbar';
import CreatePost from './components/create/CreatePost';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Logout from './components/account/Logout'
import Details from './components/details/DetailsView'
import UpDatePost from './components/create/UpDatePost';


const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ?
    <div>
      <Navbar />
      <Outlet />
    </div>
    : <Navigate replace to='/login' />;
};
const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <div className='mt-[4%]'>
        <Routes>
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/' element={<HomePage />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/createpost' element={<CreatePost />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/contact' element={<Contact />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/about' element={<About />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/logout' element={<Logout />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/details/:id' element={<Details />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/update/:id' element={<UpDatePost />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
export default App;
