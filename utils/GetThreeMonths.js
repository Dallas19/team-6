const months = {
	January: ['January', 'February', 'March'],
	February: ['February', 'March', 'April'],
	March: ['March', 'April', 'May'],
	April: ['April', 'May', 'June'],
	May: ['May', 'June', 'July'],
	June: ['June', 'July', 'August'],
	July: ['July', 'August', 'September'],
	August: ['August', 'September', 'October'],
	September: ['September', 'October', 'November'],
	October: ['October', 'November', 'December'],
	November: ['November', 'December', 'January'],
	December: ['December', 'January', 'February']
}
function getThreeMonths(startMonth) {
	return months[startMonth]
}

module.exports = getThreeMonths
