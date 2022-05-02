import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getDatabase, ref, set, child, get } from "firebase/database";
import TodoList from "../components/TodoList";
import "./HomePage.css";

const HomePage = () => {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [id, setId] = useState<string | undefined>("");
  const [todoData, setTodoData] = useState<any>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("currentUser", currentUser?.uid);
    });
  });

  function writeUserData(todo: any) {
    if (todo != "") {
      const updatedData = [...todoData];
      updatedData[todoData.length] = todo;
      const db = getDatabase();
      if (id != undefined || id != "") {
        set(ref(db, "users/" + id), updatedData);
      }
      getDataSnapShot();
    }
  }

  const handleDeleteTodo = (index: number) => {
    let updatedData = [...todoData].filter((item: any, indexofItem: number) => {
      return index != indexofItem;
    });
    const db = getDatabase();
    if (id != undefined || id != "") {
      set(ref(db, "users/" + id), updatedData);
      getDataSnapShot();
    }
  };

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
            setTodoData([]);
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

  const handleOnEdit = (e: any, itemNo: number) => {
    console.log(e.target.value, itemNo);
    setTodoData((prev: any) => {
      const updateTodo = [...prev];
      updateTodo[itemNo] = e.target.value;
      return updateTodo;
    });
  };

  const handleOnEditClick = (itemNumber: number) => {
    const db = getDatabase();
    if (id != undefined || id != "") {
      set(ref(db, "users/" + id + "/" + itemNumber), todoData[itemNumber]);
    }
    getDataSnapShot();
  };

  return (
    <div className="homeContainer">
      <button onClick={logout} className={"logoutBtn"}>
        Logout
      </button>
      <TodoList
        list={todoData}
        writeUserData={writeUserData}
        handleDeleteTodo={handleDeleteTodo}
        handleOnEdit={handleOnEdit}
        handleOnEditClick={handleOnEditClick}
      ></TodoList>
      <div style={{ display: "flex" }}>
        <h6> User : </h6>
        <h5> {user?.email}</h5>
      </div>
    </div>
  );
};

export default HomePage;
