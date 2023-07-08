import React from "react";
import TodoItem from "./TodoItem";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todoList-slice";
import { useSelector } from "react-redux";

export default function TodoList() {
  const dispatch = useDispatch();
  const todoListItems = useSelector((state) => state.todo.items);
  console.log("items", todoListItems);
  const cleanHandler = () => {
    dispatch(todoActions.clearItemsFromList());
  };
  return (
    <>
      <ul className="list-group my-5">
        <h3 className="text-capitalize text-center">Todo list</h3>
        {todoListItems.map((item) => {
          return <TodoItem key={item.id} id={item.id} title={item.title} />;
        })}
      </ul>
      {todoListItems.length !== 0 ? (
        <div className="list-group my-5 mx-auto">
          <button
            className="btn btn-block text-capitalize custom-button-clear mb-5"
            onClick={cleanHandler}
          >
            clear list
          </button>
        </div>
      ) : (
        <div className="list-group my-5 mx-auto text-center">
          There is no item added yet.
        </div>
      )}
    </>
  );
}
