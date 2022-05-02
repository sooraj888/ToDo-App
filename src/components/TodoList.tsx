import React, { useState } from "react";
import "./TodoList.css";
const TodoList = ({
  list,
  writeUserData,
  handleDeleteTodo,
  handleOnEdit,
  handleOnEditClick,
}: any) => {
  const [todoItem, setTodoItem] = useState("");
  return (
    <div className="TodoMainContainer">
      <div className="addTodoContainer">
        <input
          className="todoItem"
          placeholder="Add new todo "
          type={"text"}
          value={todoItem}
          onChange={(e) => {
            setTodoItem(e.target.value);
          }}
        ></input>

        <input
          className="addButton"
          type={"button"}
          onClick={() => {
            writeUserData(todoItem);
            setTodoItem("");
          }}
          value={"Add"}
        ></input>
      </div>
      <div className="todoList">
        {list?.map((item: any, id: number) => {
          return (
            <div key={id} className={"todoContainer"}>
              {
                <input
                  className="todo"
                  type={"text"}
                  value={item}
                  onChange={(e: any) => {
                    handleOnEdit(e, id);
                  }}
                ></input>
              }
              <button
                className="edit button"
                onClick={() => handleOnEditClick(id)}
              >
                Edit
              </button>
              <button
                className="delete button"
                onClick={() => handleDeleteTodo(id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
