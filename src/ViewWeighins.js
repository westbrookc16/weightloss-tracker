import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { useCollection } from 'react-firebase-hooks/firestore';
import { UserContext } from './firebase/FirebaseUser';
import { FirebaseContext } from './firebase/firebase';
const Viewweighins = () => {
	const main = React.createRef(null);
	const user = useContext(UserContext);
	const firebase = useContext(FirebaseContext);

	const [weighIns, loading, error] = useCollection(
		firebase.db
			.collection('weighins')
			.where('uid', '==', user.uid ? user.uid : '')
			.orderBy('date')
	);
	useEffect(() => {
		main.current.focus();
		document.title = 'View Weighins';
	}, [main]);
	return (
		<div>
			<h1 ref={main} tabIndex="-1">
				View Weighins
			</h1>
			{loading && <div>Loading...</div>}
			{error && <div>Error:{error}</div>}
			{weighIns && (
				<table>
					<tbody>
						<tr>
							<td>Date</td>
							<td>Weight</td>
							<td>Change Since Last Weigh-in</td>
						</tr>
						{weighIns.docs.map(doc => {
							const data = doc.data();
							const { date, weight, difference } = data;
							return (
								<tr key={doc.id}>
									<td>{moment(date.toDate()).format('MM/DD/YYYY')}</td>
									<td>{weight}</td>
									<td>{difference}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};
export default Viewweighins;
