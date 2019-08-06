import React, { useContext, useRef } from 'react';
import { UserContext } from './firebase/FirebaseUser';
import Status from './Status';
import useInitialfocus from './hooks/useInitialFocus';

const Home = () => {
	const main = useRef(null);
	useInitialfocus(main, 'Home');
	const user = useContext(UserContext);
	return (
		<div>
			<h1 ref={main} tabIndex="-1">
				Home
			</h1>
			Welcome to my weight loss app. Hope you enjoy.
			{user.uid && <Status {...user} />}
		</div>
	);
};
export default Home;
