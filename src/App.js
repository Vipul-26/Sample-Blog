import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import BlogDetails from './components/blogs/BlogDetails';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import CreateBlog from './components/blogs/CreateBlog';
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const App = () => {

  var Loader = require("react-loader");

  const AuthIsLoaded = ({ children }) => {
    const auth = useSelector(state => state.firebase.auth);
    if (!isLoaded(auth)) {
      return (
        <div>
          <Loader />
        </div>
      );
    };
    return children;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <AuthIsLoaded>
          <Navbar />
          <h1>jjgjhjh</h1>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/blog/:id' component={BlogDetails} />
            <Route path='/signin' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateBlog} />
          </Switch>
        </AuthIsLoaded>
      </div>
    </BrowserRouter>
  );
};

export default App;
