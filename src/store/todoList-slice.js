import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

const persistantState = window.localStorage.getItem("todos")
  ? JSON.parse(window.localStorage.getItem("todos"))
  : [];

const defaultSttate = {
  items: persistantState,
  id: uuid(),
  title: "",
  editItem: false,
};

const todoListSlice = createSlice({
  name: "todolist",
  initialState: defaultSttate,

  reducers: {
    getItemsFromLocalStorage(state) {
      const localStorageItems = JSON.parse(localStorage["todos"]);
      state.items = localStorageItems;
    },
    editAddToList(state, action) {
      console.log(state.id);
      console.log(action.payload.title);
      const newItem = {
        id: state.id,
        title: action.payload.title,
      };
      state.items = [...state.items, newItem];
      window.localStorage.setItem("todos", JSON.stringify(state.items));
      state.editItem = false;
      state.title = "";
      toast.success("Todo added successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    addItemToList(state, action) {
      if (action.payload.title.trim() !== "") {
        const newItem = {
          id: action.payload.id,
          title: action.payload.title,
        };
        state.items = [...state.items, newItem];
        window.localStorage.setItem("todos", JSON.stringify(state.items));
        state.title = "";

        toast.success("Todo added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Please enter a valid todo!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    },
    editItemFromList(state, action) {
      const id = action.payload.id;
      const tempItems = state.items.filter((item) => item.id !== id);
      const selectedItem = state.items.find((item) => item.id === id);
      state.items = tempItems;
      state.title = selectedItem.title;
      state.editItem = true;
      state.id = id;

      toast.info("Edit mode activated!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    },
    clearItemsFromList(state) {
      state.items = [];
      localStorage.clear();

      toast.info("All todos cleared!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    deleteItemFromList(state, action) {
      const id = action.payload.id;
      const tempItems = state.items.filter((item) => item.id !== id);
      state.items = tempItems;
      const localStorageItems = JSON.parse(localStorage["todos"]);
      console.log(localStorageItems);
      for (let element of localStorageItems) {
        console.log(element);
        if (element.id === id) {
          localStorageItems.splice(element, 1);
        }
      }
      const newStorageItems = JSON.stringify(localStorageItems);
      window.localStorage.setItem("todos", newStorageItems);

      toast.warn("Todo deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    changeInput(state, action) {
      state.title = action.payload.title;
    },
  },
});
export const todoActions = todoListSlice.actions;
export default todoListSlice.reducer;
