import React from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todoList-slice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function TodoItem(props) {
  const dispatch = useDispatch();
  const editHandler = (id) => {
    console.log("id", id);
    dispatch(
      todoActions.editItemFromList({
        id,
      })
    );
  };
  const deleteHandler = (id) => {
    dispatch(
      todoActions.deleteItemFromList({
        id,
      })
    );
  };
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center my-2 rounded-lg shadow-sm"
      style={{
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        color: "#fff",
      }}
    >
      <h6 className="text-capitalize">{props.title}</h6>
      <div className="todo-icon">
        <span
          className="text-primary btn btn-link btn-sm p-0 me-2"
          onClick={() => editHandler(props.id)}
        >
          <FaEdit size={18} />
        </span>
        <span
          className="text-danger btn btn-link btn-sm p-0"
          onClick={() => deleteHandler(props.id)}
        >
          <FaTrashAlt size={18} />
        </span>
      </div>
    </li>
  );
}
