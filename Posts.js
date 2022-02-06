import { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";

const Posts = ({ posts, setPosts, userData, token }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (POST_ID) => {
    const filteredArray = posts.filter((item) => item._id !== `${POST_ID}`);
    setPosts(filteredArray);
    try {
      const response = await fetch(`${BASE_URL}posts/${POST_ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const postMatches = (post, text) => {
    if (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.includes(searchTerm) ||
      post.price.includes(searchTerm) ||
      post.location.includes(searchTerm) ||
      post.author.username.includes(searchTerm)
    ) {
      return true;
    }
  };
  const filteredPosts = posts.filter((item) => postMatches(item, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <>
      <h1 className="main-head">Posts</h1>
      {userData && (
        <Link className="link" to="/createpost">
          <h3 id="create-post">Create a New Post</h3>
        </Link>
      )}
      <div id="search">
        <section id="search-bar">
          <input
            value={searchTerm}
            placeholder="Search Posts"
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
              postMatches;
            }}
          ></input>
        </section>
      </div>
      <section id="all-posts">
        {postsToDisplay.map((post) => {
          return (
            post.active && (
              <div key={post._id} className="post-results">
                <Link className="post-links" to={`/posts/post/${post._id}`}>
                  <h3 className="post-title">{post.title}</h3>
                </Link>
                <p className="post-info">{post.description}</p>
                <h4 className="post-info">Price: {post.price}</h4>
                <h4 className="post-info">Seller: {post.author.username}</h4>
                <h4 className="post-info">Location: {post.location}</h4>
                {userData ? (
                  post.isAuthor ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <Link id="send-message" to={`/message/${post._id}`}>
                        <button>Send Message</button>
                      </Link>
                    </>
                  )
                ) : null}
                <hr></hr>
              </div>
            )
          );
        })}
      </section>
    </>
  );
};

export default Posts;
