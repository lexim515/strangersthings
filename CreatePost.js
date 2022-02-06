import { useHistory } from "react-router";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";
const API_POSTS = `${BASE_URL}posts`;

const CreatePost = ({
  userData,
  setTitle,
  setDescription,
  setPrice,
  setWillDeliver,
  title,
  description,
  price,
  willDeliver,
  error,
  token,
  location,
  setLocation,
  fetchPosts,
  setError,
}) => {
  const history = useHistory();
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
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    history.push("/posts");
  };

  if (userData) {
    return (
      <div id="create-post">
        <h3>Create a New Post</h3>
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
    );
  } else {
    return null;
  }
};

export default CreatePost;
