import { useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";
const API_POSTS = `${BASE_URL}posts`;

const EditPost = ({
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
  posts,
  token,
  error,
  setError,
  fetchPosts,
}) => {
  const history = useHistory();
  const { id } = useParams();
  const post = posts.filter((post) => id === post._id);

  const createForm = () => {
    if (title === "") {
      setTitle(post.title);
    }
    if (description === "") {
      setDescription(post.description);
    }
    if (price === "") {
      setPrice(post.price);
    }
    if (location === "") {
      setLocation(post.location);
    }
  };

  useEffect(() => {
    createForm();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_POSTS}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error.message);
    }
    fetchPosts();
    history.push("/posts");
  };

  return posts.map((post) => {
    return (
      post._id === id && (
        <div id="create-post" key={post._id}>
          <h3>Edit Post</h3>
          <form className="new-post" onSubmit={handleSubmit}>
            <input
              className="input-posts"
              type="text"
              value={title}
              placeholder={post.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <input
              className="input-posts"
              type="text"
              value={description}
              placeholder={post.description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
            <input
              className="input-posts"
              type="text"
              value={price}
              placeholder={post.price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input>
            <input
              className="input-posts"
              value={location}
              placeholder={post.location}
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
            <button type="submit">Update Post</button>
          </form>
          <p>{error}</p>
        </div>
      )
    );
  });
};

export default EditPost;
