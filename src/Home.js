import React, { useContext, useEffect } from "react";
import { UserContext } from "./firebase/FirebaseUser";
import Status from "./Status";

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  });
  const user = useContext(UserContext);
  return (
    <div>
      <main>
        <h1>Home</h1>
        Welcome to my weight loss app. Hope you enjoy.
        {user.uid && <Status {...user} />}
      </main>
    </div>
  );
};
export default Home;
