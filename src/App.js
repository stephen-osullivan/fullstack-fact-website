import { useState, useEffect } from 'react';
//import LoginPage from './pages/LoginPage';
import FactSharePage from './pages/FactSharePage';
import LoginPage from './pages/LoginPage';
import './styles.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('LoginPage');
  
  // Your authentication logic here...

  if (currentPage === "LoginPage") {
    return <LoginPage setCurrentPage={setCurrentPage} user={user} setUser={setUser}/>;
  } else{
    return <FactSharePage user={user} setCurrentPage={setCurrentPage}/>;
  }
  
}