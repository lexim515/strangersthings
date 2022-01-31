import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar, Home, Posts, AccountForm, Profile } from "./Components";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-rm-web-pt/";
const API_POSTS = `${BASE_URL}posts`;
const API_REGISTER = `${BASE_URL}users/register`;
const API_LOGIN = `${BASE_URL}users/login`;
const API_USER = `${BASE_URL}users/me`;

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(true);

  const fetchPosts = async () => {
    const response = await fetch(`${API_POSTS}`);
    const info = await response.json();
    // console.log(info);
    setPosts(info.data.posts);
  };

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
    console.log(lsToken);
    if (lsToken) {
      setToken(lsToken);
    }
    try {
      const response = await fetch(`${API_USER}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const info = await response.json();
      console.log(info.data);
      setUserData(info.data);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(userData);
  // console.log(token);

  // console.log(posts);
  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, [token]);

  return (
    <>
      <div id="navbar">
        <h1 id="main-header">Stranger's Things</h1>
        <div id="links">
          <Navbar
            userData={userData}
            setUserData={setUserData}
            setToken={setToken}
          />
        </div>
      </div>
      <div id="main-section">
        <Route exact path="/">
          <Home userData={userData} />
        </Route>
        <Route path="/posts">
          <Posts
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            location={location}
            setLocation={setLocation}
            willDeliver={willDeliver}
            setWillDeliver={setWillDeliver}
            posts={posts}
            setPosts={setPosts}
            userData={userData}
            token={token}
          />
        </Route>
        <Route path="/register">
          <AccountForm action="register" token={token} setToken={setToken} />
        </Route>
        <Route path="/login">
          <AccountForm action="login" token={token} setToken={setToken} />
        </Route>
        <Route path="/profile">
          <Profile
            posts={posts}
            setPosts={setPosts}
            token={token}
            userData={userData}
            title={title}
            description={description}
            price={price}
            location={location}
            willDeliver={willDeliver}
          />
        </Route>
      </div>
    </>
  );
};

const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  app
);
