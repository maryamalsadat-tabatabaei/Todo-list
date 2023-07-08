import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../store/todoList-slice";
import { v4 as uuid } from "uuid";
import { FaPlus } from "react-icons/fa";

export default function TodoInput() {
  const [enteredInput, setEnteredInput] = useState("");
  const dispatch = useDispatch();
  const itemTitle = useSelector((state) => state.todo.title);
  const editItem = useSelector((state) => state.todo.editItem);

  const submitHandler = (e) => {
    e.preventDefault();
    setEnteredInput(e.target.value);

    {
      editItem
        ? dispatch(
            todoActions.editAddToList({
              title: enteredInput ? enteredInput : itemTitle,
            })
          )
        : dispatch(
            todoActions.addItemToList({ title: enteredInput, id: uuid() })
          );
    }

    setEnteredInput("");
  };
  const changeHandler = (e) => {
    setEnteredInput(e.target.value);
    dispatch(todoActions.changeInput({ title: e.target.value }));
  };
  return (
    <div className="card card-body my-3 shadow-sm">
      <form onSubmit={submitHandler}>
        <div className="input-group ">
          <input
            type="text"
            className="form-control text-capitalize border-0 bg-light"
            placeholder="Add a todo item"
            value={itemTitle ? itemTitle : enteredInput}
            onChange={changeHandler}
          />
          <div className="input-group-append">
            <button
              type="submit"
              className="btn custom-button"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #90b0ca, linear-gradient(to right, #ff5f6d, #ffc371))",

                boxShadow: editItem
                  ? "0 0 5px rgba(0, 0, 255, 0.3)"
                  : "0 0 5px rgba(0, 128, 0, 0.3)",
              }}
            >
              {editItem ? "Edit item" : "Add item"}
              <FaPlus className="ms-2" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
