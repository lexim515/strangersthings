import { useState } from "react";
import React from "react";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";

const MyPosts = ({ userData, setPosts, posts }) => {
  console.log(userData);
  // const [POST_ID, setPOST_ID] = useState("");

  const lsToken = localStorage.getItem("token");

  // console.log(`${BASE_URL}posts/${POST_ID}`);
  console.log(lsToken);

  const myPostsArr = posts.filter((post) => post.isAuthor === true);

  console.log(posts);
  console.log(myPostsArr);

  const handleDelete = async (POST_ID) => {
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
  // console.log(POST_ID);

  return (
    <div id="my-posts">
      <h3 id="post-label" className="my-info">
        My Posts:
      </h3>
      <section className="my-messages">
        {myPostsArr.map((post) => {
          return post.active ? (
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
                  // setPOST_ID(id);
                  handleDelete(id);
                }}
              >
                DELETE
              </button>
              <hr></hr>
            </div>
          ) : (
            <h1>Hello</h1>
          );
        })}
      </section>
    </div>
  );
};

const MyMessages = ({ userData, posts }) => {
  return (
    <div>
      <h3 id="messages" className="my-info">
        Messages To Me:
      </h3>
      <section className="my-messages">
        {userData &&
          posts.map((post) => {
            return (
              post.isAuthor === true &&
              post.messages.length > 0 &&
              post.messages.map((message) => {
                <div className="post-results" key={message._id}>
                  <h3 className="post-title">{post.title}</h3>
                  <h4 className="post-info">{message.content}</h4>
                  <h4 className="post-info">
                    Sent By: {message.fromUser.username}
                  </h4>

                  <hr></hr>
                </div>;
              })
            );
          })}
      </section>
      <h3 id="messages" className="my-info">
        Messages From Me:
      </h3>
      <section className="my-messages">
        {userData &&
          userData.messages.map((message) => {
            return (
              <div className="post-results" key={message._id}>
                <h3 className="post-title">{message.post.title}</h3>
                <h4 className="post-info">{message.content}</h4>
                <h4 className="post-info">
                  Sent By: {message.fromUser.username}
                </h4>

                <hr></hr>
              </div>
            );
          })}
      </section>
    </div>
  );
};

const Profile = ({ userData, setPosts, posts }) => {
  return (
    <div id="main-profile">
      <h2 id="profile-title">Profile</h2>

      <MyPosts userData={userData} setPosts={setPosts} posts={posts} />

      <MyMessages userData={userData} posts={posts} />
    </div>
  );
};

export default Profile;
