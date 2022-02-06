import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import {
  Navbar,
  Home,
  Posts,
  AccountForm,
  Profile,
  Message,
  CreatePost,
  EditPost,
  PostDetails,
} from "./Components";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";
const API_POSTS = `${BASE_URL}posts`;
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
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const fetchPosts = async () => {
    const headers = token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          "Content-Type": "application/json",
        };
    const response = await fetch(`${API_POSTS}`, {
      method: "GET",
      headers,
    });
    const info = await response.json();
    setPosts(info.data.posts);
  };

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");
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
      setUserData(info.data);
      setUsername(info.data.username);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, [token]);

  // useEffect(() => {
  //   fetchUser();
  // }, [content]);

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
        <Route exact path="/posts">
          <Posts
            posts={posts}
            setPosts={setPosts}
            userData={userData}
            token={token}
          />
        </Route>
        <Route path="/createpost">
          <CreatePost
            userData={userData}
            setTitle={setTitle}
            setDescription={setDescription}
            setPrice={setPrice}
            setWillDeliver={setWillDeliver}
            setPosts={setPosts}
            setError={setError}
            title={title}
            description={description}
            price={price}
            willDeliver={willDeliver}
            error={error}
            token={token}
            location={location}
            setLocation={setLocation}
            fetchPosts={fetchPosts}
          />
        </Route>
        <Route path="/posts/:id">
          <EditPost
            userData={userData}
            setTitle={setTitle}
            setDescription={setDescription}
            setPrice={setPrice}
            setWillDeliver={setWillDeliver}
            setError={setError}
            title={title}
            description={description}
            price={price}
            willDeliver={willDeliver}
            error={error}
            token={token}
            posts={posts}
            location={location}
            setLocation={setLocation}
            fetchPosts={fetchPosts}
          />
        </Route>
        <Route path="/posts/post/:id">
          <PostDetails posts={posts} userData={userData} />
        </Route>
        <Route path="/register">
          <AccountForm
            action="register"
            setToken={setToken}
            error={error}
            setError={setError}
          />
        </Route>
        <Route path="/login">
          <AccountForm
            action="login"
            setToken={setToken}
            error={error}
            setError={setError}
          />
        </Route>
        <Route path="/profile">
          <Profile posts={posts} setPosts={setPosts} userData={userData} />
        </Route>
        <Route path="/message/:id">
          <Message
            content={content}
            setContent={setContent}
            fetchUser={fetchUser}
            message={message}
            setMessage={setMessage}
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
