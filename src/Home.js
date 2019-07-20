import React, { useContext, useEffect } from 'react';
import { UserContext } from './firebase/FirebaseUser';
import Status from './Status';

const Home = () => {
	const main = React.createRef(null);
	useEffect(() => {
		//main.current.focus();
		document.title = 'Home';
	}, [main]);
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
