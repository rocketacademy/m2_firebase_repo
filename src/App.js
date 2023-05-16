import logo from "./logo.svg";
import "./App.css";
import FruitForm from "./Component/FruitForm";
import FruitList from "./Component/FruitList";
import { useState, useEffect } from "react";
import AuthForm from "./Component/AuthForm";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {isLoggedIn ? <h2>Welcome back {user.email}</h2> : null}
        {isLoggedIn ? (
          <button
            onClick={(e) => {
              setIsLoggedIn(false);
              signOut(auth);
              setUser({});
            }}
          >
            Logout!
          </button>
        ) : null}

        {isLoggedIn ? <FruitForm /> : <AuthForm />}

        <FruitList />
      </header>
    </div>
  );
}

export default App;
