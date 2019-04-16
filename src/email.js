const sg = require('@sendgrid/mail')
sg.setApiKey(process.env.SENDGRID_API_KEY)

const lateEmail = (userEmail, userName, userSituation) => {

	let event
	if (userSituation === 'accident') {
		event = "a car accident"
	} else if (userSituation === 'traffic') {
		event = "stuck in traffic"
	} else if (userSituation === 'broken') {
		event = "my car broken"
	} else if (userSituation === 'weather') {
		event = "a bad situation"
	}

	sg.send({
		to: process.env.TARGET_EMAIL,
		from: userEmail,
		subject: "Sorry. I'm running late because...",
		//text: `Deark Customer: \n \n Congratulations! You have been selected randomly by Broke-And-Need-Money to recieve a sum of $1,000,000! You will find the fund deposited into your primary checking account. Please thank James and Angela for signing you up for this amazing program that is exclusive to HRLA29. \n \n Sincerely, \n Consumer & Community Banking`
		text: `Hello. This is ${userName}. I'm so sorry. I'm on my way in now, but I got ${event}. My apologies again. It shouldn’t be much longer. \n Thank you. \n ${userEmail} \n ${userName}` 
	})
}

module.exports = lateEmail
