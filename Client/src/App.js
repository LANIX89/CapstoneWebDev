import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import './App.css';
import Axios from 'axios';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { History } from './Pages/History';

function App() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  let isAuth = loginStatus;

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    })
  };

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    })
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, [])



  return (
    <div className='app'>

      <div className='test'>

        <Router>

          <div>
            <Link to="/"> Home</Link>
            <Link to="/About"> About</Link>
            <Link to="/History"> History</Link>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/History" element={<History />} />
            <Route path="*" element={<h1>Youre lost MOTHERFACKA</h1>} />
          </Routes>
        </Router>

      </div>
      <div className='registration'>
        <h1>Registration</h1>
        <label>Username</label>
        <input type='text' onChange={(e) => { setUsernameReg(e.target.value); }} />
        <label>Password</label>
        <input type='text' onChange={(e) => { setPasswordReg(e.target.value); }} />
        <button onClick={register}>Register</button>
      </div>




      <div className='login'>
        <h1>Login</h1>
        <label>Username</label>
        <input type='text' placeholder='username' onChange={(e) => { setUsername(e.target.value); }} />
        <label>Password</label>
        <input type='text' placeholder='password' onChange={(e) => { setPassword(e.target.value); }} />
        <button onClick={login}>Login</button>

      </div>

      <div className='alert'>{loginStatus}</div>
    </div>
  );
}

export default App;
