import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";

const Message = ({ content, setContent, fetchUser, message, setMessage }) => {
  const { id } = useParams();
  const lsToken = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}posts/${id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lsToken}`,
        },
        body: JSON.stringify({
          message: {
            content,
          },
        }),
      });
      const info = await response.json();
      setContent("");
      fetchUser();
      setMessage("Your message has been sent!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="new-post" onSubmit={handleSubmit}>
        <input
          id="message-body"
          type="text"
          placeholder="Message Body"
          value={content}
          required
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></input>
        <button type="submit">Send Message</button>
        <p>{message}</p>
        {message !== "" && (
          <Link className="button" to="/posts">
            <button>Back to Posts</button>
          </Link>
        )}
      </form>
    </>
  );
};

export default Message;
