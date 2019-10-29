function postFeedback(event) {
	event.preventDefault();
	var url = "/feedback";
	var request = new XMLHttpRequest();
	request.open('POST', url, true);
	request.onload = function () {
		UIkit.notification({
			message: 'Message sent !',
			status: 'success',
			timeout: 2000
		});
		UIkit.slider(slider).show(0);
	};

	request.onerror = function () {
		UIkit.notification({
			message: 'Something went wrong :( !',
			status: 'danger',
			timeout: 2000
		});
	};

	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.send("feedback=" + encodeURIComponent(document.getElementById("feedback").value));

}


document.getElementById("feedback-form").addEventListener("submit", postFeedback)
