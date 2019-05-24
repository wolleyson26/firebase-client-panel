import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyDXZu4F-E-kLsQ_9WU07v0x7o4f2q-Zu4Q",
  authDomain: "react-client-panel-c4ce5.firebaseapp.com",
  databaseURL: "https://react-client-panel-c4ce5.firebaseio.com",
  projectId: "react-client-panel-c4ce5",
  storageBucket: "react-client-panel-c4ce5.appspot.com",
  messagingSenderId: "1041389559057"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  userFirestoreForProfile: true
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reacReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- need if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

// check for settings in local storage
if (localStorage.getItem("settings") === null) {
  //set default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //set to local storeage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
