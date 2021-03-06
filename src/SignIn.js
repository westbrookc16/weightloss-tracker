import React, { useContext } from 'react';
import { FirebaseContext } from './firebase/firebase';
import useInitialFocus from './hooks/useInitialFocus';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Signin = ({ history }) => {
	const main = React.useRef(null);
	const firebase = useContext(FirebaseContext);

	useInitialFocus(main, 'Sign In');
	const uiConfig = {
		// Popup signin flow rather than redirect flow.
		//signInFlow: 'popup',

		signInSuccessUrl: '/',

		signInOptions: [firebase.googleProvider, firebase.emailProvider],
	};

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
