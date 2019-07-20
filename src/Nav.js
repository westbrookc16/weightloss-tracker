import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from './firebase/FirebaseUser';
import { FirebaseContext } from './firebase/firebase';
const Nav = () => {
	const [signOut, setSignOut] = useState(false);
	const firebase = useContext(FirebaseContext);
	const user = useContext(UserContext);

	return (
		<div>
			{signOut && <Redirect to="/" />}
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				{!user.uid && (
					<li>
						<Link to="signin">Sign In</Link>
					</li>
				)}
				{user.uid && (
					<li>
						<button
							type="button"
							onClick={e => {
								e.preventDefault();
								firebase.signOut();
								setSignOut(true);
							}}
							id="btnSignout"
						>
							Sign Out
						</button>
					</li>
				)}
				<li>
					<Link to="/about">About</Link>
				</li>
				{user.uid && (
					<li>
						<Link to="/weighin">Add Weigh-In</Link>
					</li>
				)}
				{user.uid && (
					<li>
						<Link to="viewWeighins">View Weighins</Link>
					</li>
				)}
			</ul>
		</div>
	);
};
export default Nav;
