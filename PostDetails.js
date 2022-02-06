import { useParams } from "react-router";
import { Link } from "react-router-dom";

const PostDetails = ({ posts, userData }) => {
  if (!posts.length) {
    return <div></div>;
  }
  const { id } = useParams();
  const post = posts.find((post) => id === post._id);

  return (
    <>
      <h1 className="main-head">This Post</h1>
      <div>
        {post && post.isAuthor ? (
          <div className="post-results">
            <h3 className="post-title">{post.title}</h3>

            <p className="post-info">{post.description}</p>
            <h4 className="post-info">Price: {post.price}</h4>
            <h4 className="post-info">Seller: {post.author.username}</h4>
            <h4 className="post-info">Location: {post.location}</h4>
            <h4 className="post-info">Messages: </h4>
            {post.messages &&
              post.messages.map((message) => {
                return (
                  <div className="post-results" key={message._id}>
                    <h3 className="post-title">{post.title}</h3>
                    <h4 className="post-info">{message.content}</h4>
                    <h4 className="post-info">
                      Sent By: {message.fromUser.username}
                    </h4>
                    <hr></hr>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="post-results">
            <h3 className="post-title">{post.title}</h3>

            <p className="post-info">{post.description}</p>
            <h4 className="post-info">Price: {post.price}</h4>
            <h4 className="post-info">Seller: {post.author.username}</h4>
            <h4 className="post-info">Location: {post.location}</h4>
            {userData && (
              <Link id="send-message" to={`/message/${post._id}`}>
                <button>Send Message</button>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default PostDetails;
