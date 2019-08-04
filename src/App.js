import React from 'react';
import ViewWeighIns from './ViewWeighins';
import { firebase, FirebaseContext } from './firebase/firebase.js';
import { FirebaseUser } from './firebase/FirebaseUser';
import Home from './Home';
import Weighin from './Weighin';
import About from './About';
import Nav from './Nav';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function App() {
	return (
		<Container maxWidth="sm">
			<FirebaseContext.Provider value={new firebase()}>
				<FirebaseUser>
					<Router>
						<Nav />
						<Box my={4}>
							<Route path="/" exact component={Home} />
							<Route path="/signin" component={SignIn} />
							<Route path="/weighin" component={Weighin} />
							<Route path="/about" component={About} />
							<Route path="/viewWeighins" component={ViewWeighIns} />
						</Box>
					</Router>
				</FirebaseUser>
			</FirebaseContext.Provider>
		</Container>
	);
}

export default App;
