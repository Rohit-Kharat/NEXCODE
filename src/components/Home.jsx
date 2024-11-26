import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const userCreds = JSON.parse(sessionStorage.getItem("user-creds"));
    if (!userCreds) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <h2>Welcome Home</h2>
      <button onClick={() => window.location.href = "/login"}>Log Out</button>
    </div>
  );
};

export default Home;
