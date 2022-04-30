import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Box } from "@mui/material";

import { getDatabase, ref, set, child, get } from "firebase/database";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

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

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser: any) => {
  //     setUser(currentUser);
  //     console.log("currentUser", currentUser?.uid);
  //     setId(currentUser?.uid);
  //   });
  // });

  // useEffect(() => {
  //   console.log("uuuu", user);
  //   if (user != null) {
  //     navigate("/home", { state: user });
  //   }
  // }, [user]);

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
    <div className="App">
      {Signtype ? (
        <div>
          <h3> Register User </h3>
          <Box>
            <input
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
          </Box>
          <button onClick={register}> Create User</button>
        </div>
      ) : (
        <Box>
          <h2> Login </h2>
          <input
            type={"text"}
            placeholder="Email.."
            value={loginEmail}
            name="login email"
            onChange={(event: any) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            type={"password"}
            value={loginPassword}
            placeholder="Password.."
            name="login password"
            onChange={(event: any) => {
              setLoginPassword(event.target.value);
            }}
          />
          <button onClick={login}> Login</button>
        </Box>
      )}
      <h5>OR</h5>
      <button
        onClick={() => {
          setSigntype((prev) => !prev);
        }}
      >
        {Signtype ? "Login" : "Create User"}
      </button>
      <div style={{ color: "red" }}>{fireBaseError}</div>
    </div>
  );
};

export default Registration;
