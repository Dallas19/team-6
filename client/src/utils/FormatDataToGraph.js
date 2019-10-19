// assuming only three months of data exists because of dataset
function formatData(data) {
	const arr = []
	let monthOne = 'Unique Count July 2019'
	let monthTwo = 'Unique Count August 2019'
	let monthThree = 'Unique Count September 2019'
	data.forEach(d => {
		for (const [key, value] of Object.entries(d)) {
			if (key === monthOne) {
				arr.push({ x: 1, y: value, size: 1 })
			} else if (key === monthTwo) {
				arr.push({ x: 2, y: value, size: 1 })
			} else if (key === monthThree) {
				arr.push({ x: 3, y: value, size: 1 })
			}
		}
	})
	return arr
}

export default formatData
