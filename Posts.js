import { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";
const API_POSTS = `${BASE_URL}posts`;

const Posts = ({
  posts,
  setPosts,
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  //   location,
  //   setLocation,
  willDeliver,
  setWillDeliver,
  userData,
  token,
}) => {
  const [error, setError] = useState("");
  const [POST_ID, setPOST_ID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //   const { id } = useParams();

  console.log(posts);
  //   console.log(location);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_POSTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          willDeliver,
        },
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      return setError(info.error.message);
    }
    console.log(info.data.post);
    console.log(info);
    setPosts([...posts, info.data.post]);
    setPOST_ID(info.data.post._id);
    setTitle("");
    setDescription("");
    setPrice("");
    // setLocation("");
  };

  const postMatches = (post, text) => {
    if (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.includes(searchTerm) ||
      post.price.includes(searchTerm) ||
      post.location.includes(searchTerm)
    ) {
      return true;
    }
  };
  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  console.log(postsToDisplay);

  return (
    <>
      <h1 className="main-head">Welcome to Stranger's Things!</h1>
      <h2 id="main-posts">Posts</h2>
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
      {userData && (
        <Link className="link" to="/createpost">
          <h3>Create a New Post</h3>
        </Link>
      )}
      {/* {userData ? (
        <div id="create-post">
       

          <form className="new-post" onSubmit={handleSubmit}>
            <input
              className="input-posts"
              type="text"
              required
              value={title}
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <input
              className="input-posts"
              type="text"
              required
              value={description}
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
            <input
              className="input-posts"
              type="text"
              required
              value={price}
              placeholder="Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input> */}
      {/* 
            <input
              className="input-posts"
              type="text"
              value={location}
              placeholder="Location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></input> */}

      {/* <label htmlFor="select-delivery">Delivery?</label>
            <select
              id="select-delivery"
              name="Delivery?"
              value={willDeliver}
              onChange={(e) => {
                setWillDeliver(e.target.value);
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <button type="submit">Submit Post</button>
          </form>
          <p>{error}</p>
        </div>
      ) : null} */}
      <section id="all-posts">
        {postsToDisplay.map((post) => {
          return (
            post.active && (
              <div key={post._id} className="post-results">
                <h3 className="post-title">{post.title}</h3>

                <p className="post-info">{post.description}</p>
                <h4 className="post-info">Price: {post.price}</h4>
                <h4 className="post-info">Seller: {post.author.username}</h4>
                <h4 className="post-info">Location: {post.location}</h4>
                {userData ? (
                  post.isAuthor ? (
                    <button>DELETE</button>
                  ) : (
                    <>
                      <Link id="send-message" to={`/message/${post._id}`}>
                        <button>SEND MESSAGE</button>
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
