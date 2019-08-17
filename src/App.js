import React, { lazy, Suspense } from "react";

import { firebase, FirebaseContext } from "./firebase/firebase.js";
import { FirebaseUser } from "./firebase/FirebaseUser";
import { LiveAnnouncer } from "react-aria-live";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const Nav = lazy(() => import("./Nav"));
const Home = lazy(() => import("./Home"));
const Weighin = lazy(() => import("./Weighin"));
const About = lazy(() => import("./About"));
const SignIn = lazy(() => import("./SignIn"));
const ViewWeighIns = lazy(() => import("./ViewWeighins"));
function App() {
  const LoadingMessage = () => <>Loading...</>;
  return (
    <Container maxWidth="sm">
      <LiveAnnouncer>
        <FirebaseContext.Provider value={new firebase()}>
          <FirebaseUser>
            <Router>
              <Suspense fallback={<LoadingMessage />}>
                <Nav />
                <Box my={4}>
                  <Route path="/" exact component={Home} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/weighin" component={Weighin} />
                  <Route path="/about" component={About} />
                  <Route path="/viewWeighins" component={ViewWeighIns} />
                </Box>
              </Suspense>
            </Router>
          </FirebaseUser>
        </FirebaseContext.Provider>
      </LiveAnnouncer>
    </Container>
  );
}

export default App;
