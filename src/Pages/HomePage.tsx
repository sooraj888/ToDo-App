import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getDatabase, ref, set, child, get } from "firebase/database";

const HomePage = () => {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [id, setId] = useState<string | undefined>("");
  const [todoData, setTodoData] = useState<any>("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("currentUser", currentUser?.uid);
    });
  });

  function writeUserData() {
    const db = getDatabase();
    if (id != undefined || id != "") {
      set(ref(db, "users/" + id), {
        0: "sooraj",
        1: "sooraj@gmaol.com",
        2: "sdf",
      });
    }
    getDataSnapShot();
  }

  useEffect(() => {
    console.log("user", user);
    if (user == null) {
      navigate("/");
    } else {
      setId(user?.uid);
    }
  }, [user]);

  const logout = async () => {
    await signOut(auth);
  };

  const getDataSnapShot = () => {
    if (id != "") {
      get(child(dbRef, `users/${id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setTodoData(snapshot?.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const dbRef = ref(getDatabase());
  useEffect(() => {
    getDataSnapShot();
  }, [id]);

  const localState = useLocation().state;
  return (
    <div>
      <>{user?.email}</>
      <button onClick={logout}>Logout</button>
      <div>{JSON.stringify(todoData)}</div>
      <button onClick={writeUserData}>Add</button>
    </div>
  );
};

export default HomePage;
