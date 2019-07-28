import { useState } from 'react';

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
		setSubmitting(true);

		e.preventDefault();
		validate();
		//
		if (Object.keys(errors).length === 0) {
			setSubmitting(false);
			setSuccess(await handleSubmitCallback());
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
