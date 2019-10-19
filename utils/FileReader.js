const fs = require('fs')
const csv = require('csv-parser')

async function reader(filePath, start, end) {
	const csvData = await new Promise((resolve, reject) => {
		const data = []
		fs.createReadStream(filePath, { start, end })
			.pipe(csv())
			.on('data', row => {
				data.push(row)
			})
			.on('end', () => {
				resolve(data)
			})
	})

	return csvData
}

module.exports = reader
