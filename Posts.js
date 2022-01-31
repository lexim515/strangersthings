import { useState } from "react";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-rm-web-pt/";
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
  location,
  setLocation,
  willDeliver,
  setWillDeliver,
  userData,
  token,
}) => {
  const [error, setError] = useState("");
  //   const { id } = useParams();

  console.log(posts);

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
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
  };
  return (
    <>
      <h1 className="main-head">Welcome to Stranger's Things!</h1>
      <h2 id="main-posts">Posts</h2>
      {userData ? (
        <div id="create-post">
          <h3>Create a New Post</h3>
          <form id="new-post" onSubmit={handleSubmit}>
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
            ></input>
            <input
              className="input-posts"
              type="text"
              value={location}
              placeholder="Location"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></input>
            <label htmlFor="select-delivery">Delivery?</label>
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
      ) : null}
      <section id="all-posts">
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              post.active && (
                <div key={post._id} className="post-results">
                  <h3 className="post-title">{post.title}</h3>

                  <p className="post-info">{post.description}</p>
                  <h4 className="post-info">Price: {post.price}</h4>
                  <h4 className="post-info">Seller: {post.author.username}</h4>
                  <h4 className="post-info">Location: {post.location}</h4>
                  {post.isAuthor ? (
                    <button>DELETE</button>
                  ) : (
                    <button>SEND MESSAGE</button>
                  )}
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
