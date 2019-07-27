import { useState } from 'react';
import { async } from 'q';

const useForm = (handleSubmitCallback, validateCallback, initialValues) => {
	const [form, setForm] = useState(initialValues);

	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const touchedInitial = {};
	Object.keys(form).forEach(value => {
		touchedInitial[value] = false;
	});
	const [touched, setTouched] = useState(touchedInitial);
	const validate = () => {
		setErrors(validateCallback());
	};
	const handleChange = e => {
		e.persist();
		setForm(state => {
			return { ...state, [e.target.name]: e.target.value };
		});
	};
	const handleSubmit = async e => {
		console.log('submitting...');
		setSubmitting(true);

		e.preventDefault();
		validate();
		//
		if (Object.keys(errors).length === 0) {
			let condition = handleSubmitCallback().then(res => {
				console.log('Resolve', res);
				setSuccess(res);
			}); // go test now
			// is it validatig as you like?
			//well I wanted it to set success to true so my redirect component from react-router-dom would redirect back to the home page upon successful submission.
			//is that a different problem?
			// the result in my test was false, can you submit the form with valid data?
			//valid data should be a posative number in theweight field. N sure why that is still returning falseot
			//setSuccess(false);
			console.log('handle submit callback running.', condition);
			setSubmitting(false);
		} else {
			setSubmitting(false);
			//setSuccess(false);
			// works now right?
			//yeah I saw that. I wasn't sure what you did to make it work.
			// I wrapped the handleSubmit in a promise
		}
	};
	const handleBlur = e => {
		e.persist();
		setTouched(c => {
			return { ...c, [e.target.name]: true };
		});
		validate();
	};
	return {
		handleChange,
		handleBlur,
		handleSubmit,
		setForm,
		form,
		errors,
		touched,
		submitting,
		success,
	};
};
export default useForm;
