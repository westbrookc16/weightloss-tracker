import React, { useEffect } from 'react';
const About = () => {
	const main = React.createRef(null);

	useEffect(() => {
		document.title = 'abount';
		main.current.focus();
	}, [main]);
	return (
		<div>
			<h1 tabIndex="-1" ref={main}>
				About
			</h1>
			this app is just a quick demo I built to showcase my technical skills. It allows you to track weigh ins and
			track your progress from your last weight. Have fun.
		</div>
	);
};
export default About;
