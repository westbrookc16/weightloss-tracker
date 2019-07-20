import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from './firebase/firebase';
import { UserContext } from './firebase/FirebaseUser';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
const Weighin = () => {
	const firebase = useContext(FirebaseContext);
	const user = useContext(UserContext);
	//ref for main element getting initial  focus
	const main = React.useRef(null);
	//set success state when form is submitted successfully.
	const [success, setSuccess] = useState(false);
	const [form, setForm] = useState({
		bmi: '',
		heightFeet: '',
		heightIn: '',
		weight: '',
		day: moment().format('D'),
		year: moment().format('YYYY'),
		month: moment().format('M'),
	});

	useEffect(() => {
		document.title = 'Add Weigh-in';
		main.current.focus();
	}, []);
	//get height from user object so bmi can be calculated.
	useEffect(() => {
		if (!user.loading && user.uid) {
			setForm(c => {
				return { ...c, heightIn: user.heightIn, heightFeet: user.heightFeet };
			});
		}
	}, [user]);

	const handleChange = e => {
		const { name, value } = e.target;
		setForm(c => {
			return { ...c, [name]: value };
		});
	};
	const handleSubmit = e => {
		e.preventDefault();

		//turn variables into numbers for firebase
		form.heightFeet = parseInt(form.heightFeet);
		form.heightIn = parseInt(form.heightIn);
		form.weight = parseInt(form.weight);
		form.date = moment(month, day, year);
		if (user.weight) {
			form.difference = user.weight - form.weight;
		}
		//set initial values if it is first submission
		if (!user.bmi) {
			form.startWeight = form.weight;
			form.startDate = new Date();
		}
		let totalHeight = form.heightFeet * 12 + form.heightIn;
		form.bmi = 703 * (form.weight / (totalHeight * totalHeight));
		firebase.db
			.collection('users')
			.doc(user.uid)
			.set({ ...form })
			.then(u => {
				user.setProfileData(form);
				form.uid = user.uid;
				firebase.db
					.collection('weighins')
					.add(form)
					.then(u => {
						setSuccess(true);
					});
			})
			.catch(e => {
				console.log(e);
			});
	};
	const { heightFeet, heightIn, weight, day, month, year } = form;
	return (
		<div tabIndex="-1">
			{success && <Redirect to="/" />}
			<div ref={main} tabIndex="-1">
				Please fill out the form below. All fields are required. If shis is your first time here, you will be
				asked for your height so your bmi can be calculated.
			</div>
			<form onSubmit={handleSubmit} action="">
				{!user.bmi && (
					<div>
						<p>
							<label htmlFor="heightFeet">Height (Feet)</label>
							<input
								type="text"
								id="heightFeet"
								onChange={handleChange}
								name="heightFeet"
								value={heightFeet}
							/>
						</p>
						<p>
							<label htmlFor="heightIn">Height (In)</label>
							<input type="text" id="heightIn" onChange={handleChange} name="heightIn" value={heightIn} />
						</p>
					</div>
				)}
				<fieldset>
					<legend>Date</legend>
					<p>
						<label htmlFor="month">Month</label>
						<select id="month" value={month} onChange={handleChange} name="month">
							<option value="1">Jan</option>
							<option value="2">Feb</option>
							<option value="3">Mar</option>
							<option value="4">Apr</option>
							<option value="5">May</option>
							<option value="6">Jun</option>
							<option value="7">July</option>
							<option value="8">Aug</option>
							<option value="9">Sept</option>
							<option value="10">Oct</option>
							<option value="11">Nov</option>
							<option value="12">Dec</option>
						</select>
					</p>
					<p>
						<label htmlFor="day">Day</label>
						<select id="day" name="day" value={day} onChange={handleChange}>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
							<option>9</option>
							<option>10</option>
							<option>11</option>
							<option>12</option>
							<option>13</option>
							<option>14</option>
							<option>15</option>
							<option>16</option>
							<option>17</option>
							<option>18</option>
							<option>19</option>
							<option>20</option>
							<option>21</option>
							<option>22</option>
							<option>23</option>
							<option>24</option>
							<option>25</option>
							<option>26</option>
							<option>27</option>
							<option>28</option>
							<option>29</option>
							<option>30</option>
							<option>31</option>
						</select>
					</p>
					<p>
						<label htmlFor="year">Year</label>
						<select id="year" name="year" value={year} onChange={handleChange}>
							<option>2019</option>
							<option>2020</option>
							<option>2021</option>
						</select>
					</p>
				</fieldset>
				<p>
					<label htmlFor="weight">Weight</label>
					<input type="text" id="weight" onChange={handleChange} name="weight" value={weight} />
				</p>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
export default Weighin;