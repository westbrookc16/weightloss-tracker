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

function App() {
	return (
		<div className="app">
			<FirebaseContext.Provider value={new firebase()}>
				<FirebaseUser>
					<Router>
						<Nav />
						<Route path="/" exact component={Home} />
						<Route path="/signin" component={SignIn} />
						<Route path="/weighin" component={Weighin} />
						<Route path="/about" component={About} />
						<Route path="/viewWeighins" component={ViewWeighIns} />
					</Router>
				</FirebaseUser>
			</FirebaseContext.Provider>
		</div>
	);
}

export default App;
