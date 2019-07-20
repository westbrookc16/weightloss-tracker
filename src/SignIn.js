import React, { useContext, useEffect } from 'react';
import { FirebaseContext } from './firebase/firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Signin = ({ history }) => {
	const main = React.useRef(null);
	const firebase = useContext(FirebaseContext);
	//const user = useContext(UserContext);
	useEffect(() => {
		main.current.focus();
	}, []);

	const uiConfig = {
		// Popup signin flow rather than redirect flow.
		//signInFlow: 'popup',

		signInSuccessUrl: '/',

		signInOptions: [firebase.googleProvider, firebase.emailProvider],
	};
	//const user = useCOntxt(UserContext);
	return (
		<div id="signin">
			<h1 tabIndex="-1" ref={main}>
				Sign In
			</h1>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
		</div>
	);
};
export default Signin;
