import { Link } from "react-router-dom";

const Home = ({ userData }) => {
  return (
    <>
      <h1 className="main-head">Welcome to Stranger's Things!</h1>
      {userData ? (
        <div className="main-head">
          <h2>Hello {userData.username}</h2>
          <Link className="link" to="/profile">
            Go to Profile
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Home;
