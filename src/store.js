import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  usersListReducer,
  userDetailsReducer,
  userUpdateReducer,
  userCreateReducer,
  userDeleteReducer,
  usersPageListReducer,
} from "./redux/userReducers";

const reducer = combineReducers({
  usersList: usersListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
  usersPageList: usersPageListReducer,
});

const usersListFromStorage = localStorage.getItem("pageList")
  ? JSON.parse(localStorage.getItem("pageList"))
  : [];

const initialState = {
  usersPageList: usersListFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
