import React from 'react';
const Status = ({ weight, bmi, difference }) => {
	return (
		<div>
			<h1>Status</h1>
			<table>
				<tbody>
					<tr>
						<td>Current Weight</td>
						<td>{weight}</td>
					</tr>
					<tr>
						<td>Current BMI</td>
						<td>{parseFloat(bmi).toFixed(2)}</td>
					</tr>
					<tr>
						<td>Weight Loss Since Last Weigh In</td>
						<td>{difference}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default Status;
