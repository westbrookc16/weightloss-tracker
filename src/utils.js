export const calcBmi = (weight, heightFeet, heightIn) => {
	if (parseInt(weight) > 0) {
		let totalHeight = heightFeet * 12 + heightIn;
		return 703 * (weight / (totalHeight * totalHeight));
	} else {
		return '';
	}
};
