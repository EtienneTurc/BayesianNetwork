const fs = require('fs')

function dateToDayDate(date) {
	var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = date.getFullYear();

	return mm + '/' + dd + '/' + yyyy
}

function countDates(dates) {
	let count_dates = []
	let previous_date = null
	for (let d of dates) {
		if (!d)
			continue

		let current_date = dateToDayDate(new Date(d))
		if (previous_date == current_date) {
			count_dates[count_dates.length - 1].count++
		} else {
			count_dates.push({
				date: current_date,
				count: 1
			})
		}
		previous_date = current_date
	}

	return count_dates
}

fs.readFile("trafic.txt", function (err, buf) {
	let count_dates = countDates(buf.toString().split("\n"))
	let total_count = 0
	count_dates.forEach(d => total_count += d.count)
	console.log(count_dates)
	console.log(total_count)
})
