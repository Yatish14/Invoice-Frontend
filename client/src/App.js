import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from "./context/UserContext";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import './App.css'

function App() {
  const { User,setUser } = useUser();
  const path = useLocation().pathname.split('/')[2];
  console.log(User)
  useEffect(()=> {
    return() => {
      setUser(null)
    }
  },[])
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/Invoice-Frontend" element={<Navigate to="/Invoice-Frontend/login" />} />
          {User && <Route path="/Invoice-Frontend/home" element={<UserDetails />} />}
          <Route path="/Invoice-Frontend/login" element={<Login />}/>
        </Routes>
        <div className="pls-login">
          {!User && path === 'home' && <h4>Please <Link to = '/Invoice-Frontend/login'>Log in</Link> to Continue</h4>}
        </div>
      </div>
  );
}

export default App;
