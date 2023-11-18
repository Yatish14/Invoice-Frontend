import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css"

function Login() {
  const { User, setUser } = useUser();
  const path = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();

  const handleCallback = (res) => {
    console.log(res.credential);
    const user = jwtDecode(res.credential);
    setUser(user);
    console.log(user);
    document.getElementById('signindiv').hidden = true;
    navigate('/Invoice-Frontend//home')
  };
  const handleSignOut = (res) => {
    setUser({})
    document.getElementById('signindiv').hidden = false;
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "628320380591-djkaq274nt0vgs72laa5krgjqr6nmbjt.apps.googleusercontent.com",
      callback: handleCallback,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signindiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
    window.google.accounts.id.prompt()
  }, []);

  return (
    <div className="Login">
      <div id="signindiv"></div>
    </div>
  );
}
export default Login;
