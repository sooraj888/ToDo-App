import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Box, Button } from "@mui/material";

import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [Signtype, setSigntype] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [fireBaseError, setError] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const logintoHomePage = () => {
    navigate("/home");
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      if (user != null) {
        logintoHomePage();
      }
      setError("");
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      if (user != null) {
        logintoHomePage();
      }
      console.log("user", user, user.user.uid);
      setError("");
    } catch (error: any) {
      console.log(error.message);

      setError(error.message);
    }
  };

  return (
    <div className="App maincontainer">
      {Signtype ? (
        <div className="maincontainer">
          <h2> Register User </h2>
          <Box className={"container"}>
            <input
              placeholder="Email..."
              type={"text"}
              value={registerEmail}
              onChange={(event: any) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              type={"password"}
              placeholder="Password..."
              value={registerPassword}
              onChange={(event: any) => {
                setRegisterPassword(event.target.value);
              }}
            />

            <button onClick={register} className={"buttons"}>
              {" "}
              Create User
            </button>
          </Box>
        </div>
      ) : (
        <div className="maincontainer">
          <h2> Login </h2>
          <Box className="container">
            <input
              type={"text"}
              placeholder="Email..."
              value={loginEmail}
              name="login email"
              onChange={(event: any) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              type={"password"}
              value={loginPassword}
              placeholder="Password..."
              name="login password"
              onChange={(event: any) => {
                setLoginPassword(event.target.value);
              }}
            />
            <button onClick={login} className={"buttons"}>
              Login
            </button>
          </Box>
        </div>
      )}
      <h5>OR</h5>
      <Button
        sx={{ width: "250px" }}
        variant="contained"
        onClick={() => {
          setSigntype((prev) => !prev);
        }}
      >
        {Signtype ? "Login" : "Create User"}
      </Button>
      <br></br>
      <div style={{ color: "red" }}>{fireBaseError}</div>
    </div>
  );
};

export default Registration;
