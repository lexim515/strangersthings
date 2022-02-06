import React from "react";
import { Link } from "react-router-dom";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";

const MyPosts = ({ userData, setPosts, posts }) => {
  const lsToken = localStorage.getItem("token");
  const myPostsArr = posts.filter((post) => post.isAuthor === true);

  const handleDelete = async (POST_ID) => {
    const filteredArray = posts.filter((item) => item._id !== `${POST_ID}`);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="my-posts">
      <h3 id="post-label" className="my-info">
        My Posts:
      </h3>

      <section className="my-messages">
        {myPostsArr.map((post) => {
          return post.active ? (
            <div className="post-results" key={post._id}>
              <Link className="post-links" to={`/posts/post/${post._id}`}>
                <h3 className="post-title">{post.title}</h3>
              </Link>
              <p className="post-info">{post.description}</p>
              <h4 className="post-info">Price: {post.price}</h4>
              <h4 className="post-info">Seller: {userData.username}</h4>
              <h4 className="post-info">Location: {post.location}</h4>
              <button
                value={post._id}
                onClick={(e) => {
                  const id = e.target.value;
                  handleDelete(id);
                }}
              >
                Delete
              </button>
              <Link className="button" to={`/posts/${post._id}`}>
                <button>Edit Post</button>
              </Link>
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
              post.active &&
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
                <Link
                  className="post-links"
                  to={`/posts/post/${message.post._id}`}
                >
                  <h3 className="post-title">{message.post.title}</h3>
                </Link>
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
      <h1 className="main-head">Profile</h1>
      <MyPosts userData={userData} setPosts={setPosts} posts={posts} />
      <MyMessages userData={userData} posts={posts} />
    </div>
  );
};

export default Profile;
