import { useState } from "react";
import React from "react";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-rm-web-pt/";

const MyPosts = ({ userData, setPosts, posts }) => {
  const [POST_ID, setPOST_ID] = useState("");
  console.log(userData);
  //   console.log(userData.posts);
  const lsToken = localStorage.getItem("token");

  console.log(`${BASE_URL}posts/${POST_ID}`);
  console.log(lsToken);

  const handleDelete = async () => {
    const filteredArray = posts.filter((item) => item._id !== `${POST_ID}`);
    console.log(filteredArray);
    setPosts(filteredArray);

    try {
      const response = await fetch(`${BASE_URL}posts/${POST_ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
      });
      const info = await response.json();
      console.log(info);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(POST_ID);

  return (
    <div id="my-posts">
      <h3 className="my-info">My Posts:</h3>
      {userData
        ? posts.map((post) => {
            return post.active && post.isAuthor ? (
              <div className="post-results" key={post._id}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-info">{post.description}</p>
                <h4 className="post-info">Price: {post.price}</h4>
                <h4 className="post-info">Seller: {userData.username}</h4>
                <h4 className="post-info">Location: {post.location}</h4>
                <button
                  value={post._id}
                  onClick={(e) => {
                    const id = e.target.value;
                    setPOST_ID(id);
                    handleDelete();
                  }}
                >
                  DELETE
                </button>
                <hr></hr>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
};

const MyMessages = ({ userData }) => {
  return (
    <div>
      <h3 id="messages" className="my-info">
        My Messages:
      </h3>
      {userData &&
        userData.messages.map((message) => {
          return (
            <div key={post._id} id="my-messages">
              <h3 className="message-title">{message.title}</h3>
              <p className="message-info">{message.description}</p>
              <h4 className="message-info">User: {message.author.username}</h4>
              <button>Delete Message</button>
            </div>
          );
        })}
    </div>
  );
};

const Profile = ({ userData, setPosts, posts }) => {
  return (
    <div id="main-profile">
      <h2 id="profile-title">Profile</h2>

      <MyPosts userData={userData} setPosts={setPosts} posts={posts} />

      <MyMessages userData={userData} />
    </div>
  );
};

export default Profile;
